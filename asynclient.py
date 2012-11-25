#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""A (too) simple asynchronous http client (use epoll).

not support https.

Usage:
```python
from asynclient import asynclient
from bs4 import BeautifulSoup
from pprint import pprint


# callback function take one argument, the Response object.
def callback(response):
    print(response.request)

    print(response.http) # http version
    print(response.status_code) # status code
    print(response.status) #reason phrase

    pprint(response.header) # header

    if 200 <= response.status_code < 300:
        soup = BeautifulSoup(response.body) # body
        print(soup.prettfy())


def wrapper(*args, **kwargs):
    def callback(response):
        pass
    return callback


# create client.
client1 = asynclient()
client2 = asynclient()


# use `get/post` to add task, `callback` will be called when the task finished.
# and request will redirect 5 times by default,
# set redirection to 0 to disable redirection.
# the headers is supported(?).
client1.get("http://docs.python.org/3/tutorial/index.html", callback)
client1.get("http://google.org/", callback=callback, redirection=0)


# use closure as callback.
client2.get("http://docs.python.org/3/reference/index.html", wrapper())
# use the post method, the data should be bytes.
client2.post(url, data=b"", callback=lambda x: print(x), redirection=10)


# start tasks.
client2.start()
client1.start()
```
"""

import socket
import select
import re
from urllib.parse import urlparse
from collections import namedtuple
from io import BytesIO


READ = select.EPOLLIN
WRITE = select.EPOLLOUT
STOP = select.EPOLLHUP | select.EPOLLERR


TASK = namedtuple(
    "task", ["method", "url", "body", "headers", "callback", "redirection"])


CLIENT = namedtuple(
    "client", ["socket", "request", "response", "callback", "redirection"])


DRFAULT_PORT = {"http": 80, "https": 443} # unsupport https now.


re_url = re.compile(
    r"""(?ix)
    ^https?://
    [^/]+
    \.
    [^/]{2,4}
    (/?)(?(1) .* | $)
    """)




class asynclient():
    def __init__(self):
        self.tasks = []
        self.clients = {}


    def _parse_url(self, url):
        """parse url, return (host, port, path)."""
        m = re_url.match(url)
        if not m:
            raise ValueError("invalid url: " + url)

        r = urlparse(url)

        path = r.path
        if r.query:
            path += "?" + r.query

        return (r.hostname, r.port or DRFAULT_PORT[r.scheme], path or "/")


    def _create_socket(self, host, port):
        """create non-blocking socket connection"""
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
        #s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.setblocking(0)
        return s


    def _create_clients(self):
        """create client and clear self.tasks"""
        for task in self.tasks:
            self._create_client(task)
        self.tasks.clear()


    def _create_client(self, task):
        """create client"""
        (host, port, path) = self._parse_url(task.url)

        task.headers["Host"] = host + ":" + str(port)
        request = Request(task.method, path, task.headers, task.body)

        client_socket = self._create_socket(host, port)

        fileno = client_socket.fileno()

        self.clients[fileno] = CLIENT(
            client_socket, request, BytesIO(),
            task.callback, task.redirection)

        self.epoll.register(fileno, WRITE)


    def get(self, url, callback, headers={}, redirection=5):
        self.tasks.append(
            TASK("GET", url, b"", headers, callback, redirection))


    def post(self, url, body, callback, headers={}, redirection=5):
        self.tasks.append(
            TASK("POST", url, body, headers, callback, redirection))


    def start(self):
        """create epoll and clients, start loop and close everything"""
        try:
            self.epoll = select.epoll()
            self._create_clients()
            self._loop()
        finally:
            self.epoll.close()
            for client in self.clients.values():
                client.socket.close()


    def _loop(self):
        """the main loop"""
        while len(self.clients):
            if self.tasks:
                # add task in callback
                self._create_clients()

            for fileno, event in self.epoll.poll(0):
                client = self.clients[fileno]

                if event & WRITE:
                    client.socket.sendall(client.request._request)
                    self.epoll.modify(fileno, READ)

                elif event & READ:
                    data = client.socket.recv(4096)
                    if data:
                        client.response.write(data)
                    else:
                        # all data received.
                        self.epoll.modify(fileno, 0)
                        client.socket.shutdown(socket.SHUT_RDWR)
                        self._response_handle(client)

                elif event & STOP:
                    self.epoll.unregister(fileno)
                    client.socket.close()
                    del self.clients[fileno]


    def _response_handle(self, client):
        """callback or redirect"""
        response = Response(client.request, client.response.getvalue())
        r = response.redirection(client.redirection)

        if r:
            self._create_client(TASK(callback=client.callback, **r))
        else:
            client.callback(response)




class Request():
    def __init__(self, method, path, headers, body):
        self.http = "HTTP/1.1"
        self.method = method
        self.path = path
        self.body = body

        self.headers = {
            "User-Agent": "python/asynclient",
            "Connection": "close",
            "Accept-Encoding": "identity",
        }
        self.headers.update(headers)

        request_headers = "\r\n".join(
            k + ": " + str(v) for k,v in self.headers.items())

        self._request = "{} {} HTTP/1.1\r\n{}\r\n\r\n".format(
            self.method, self.path, request_headers).encode()
        self._request += self.body




class Response():
    def __init__(self, request, data):
        self.request = request

        header_data, _, self.body = data.partition(b"\r\n\r\n")

        headers = header_data.decode().split("\r\n")

        self.http, self.status_code, self.status = (
            headers.pop(0).split(maxsplit=2))

        self.headers = {}
        for header_line in headers:
            k, v = header_line.split(": ")
            if k == "Set-Cookie" and k in self.headers:
                self.headers[k] += ";" + v
            self.headers[k] = v

        if self.headers.get("Transfer-Encoding", "") == "chunked":
            self.body = self._chunked_handle(self.body)


    def _chunked_handle(self, data):
        """decode chunked data"""
        data_buffer = BytesIO()
        while data:
            head, tail = data.split(b"\r\n", maxsplit=1)

            index = head.find(b"(")
            if index != -1:
                head = int(head[:index], 16)
            else:
                head = int(head, 16)

            data_buffer.write(tail[:head])
            data = tail[head + 2:]
        return data_buffer.getvalue()


    def redirection(self, redirection):
        """redirect or not"""
        if redirection and "300" <= self.status_code < "400":
            url = self.headers.get("Location", "")
            if url:
                return {
                    "method": self.request.method,
                    "url": url,
                    "body": self.request.body,
                    "headers": self.request.headers,
                    "redirection": redirection - 1,
                }
        return False
