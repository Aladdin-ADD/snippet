#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

"""
usage:

from tornado.ioloop import IOLoop
from redisSub import redisSub
sub = redisSub()
print(sub.subscribe("ch"))
sub.listen(lambda x: print(x))
IOLoop.instance().start()


TODO:
support `subscribe` in `listen`.
"""

import socket

from tornado import gen
from tornado.iostream import IOStream




b = lambda x: str(x).encode()




class redisSub:
    def __init__(self, host="localhost", port=6379, db=0, pw=None):
        self.sock = socket.socket()
        self.sock.connect((host, port))
        self.fp = self.sock.makefile("rb")
        self.stream = None
        if pw:
            self._command("AUTH", pw)
            self._read_response()
        if db:
            self._command("SELECT", db)
            self._read_response()

    def _command(self, *args):
        cmd = [b"*", b(len(args)), b"\r\n"]
        for val in args:
            val = b(val)
            cmd += [b"$", b(len(val)), b"\r\n", val, b"\r\n"]
        cmd = b"".join(cmd)
        self.sock.sendall(cmd)

    def _read_response(self):
        data = self.fp.readline()
        flag, response = data[0], data[1:-2]
        if flag == 36: # b"$" bulk
            length = int(response) + 2
            response = self.fp.read(length)
            response = response[:-2].decode()
        elif flag == 42: # b"*" multi bulk
            length = int(response)
            response = [self._read_response() for i in range(length)]
        elif flag == 58: # b":" integer
            response = int(response)
        elif flag == 43: # b"+" status
            response = response.decode()
        elif flag == 45: # b"-" error
            raise Exception(response.decode())
        return response

    def subscribe(self, *channels):
        self._command("SUBSCRIBE", *channels)
        return [self._read_response() for i in channels]

    def unsubscribe(self, *channels):
        self._command("UNSUBSCRIBE", *channels)
        return [self._read_response() for i in channels]

    def psubscribe(self, *pattenns):
        self._command("PSUBSCRIBE", *pattenns)
        return [self._read_response() for i in pattenns]

    def punsubscribe(self, *pattenns):
        self._command("PUNSUBSCRIBE", *pattenns)
        return [self._read_response() for i in pattenns]

    def listen(self, callback):
        if self.stream is None:
            self.fp.close()
            self.fp = None
            self.stream = IOStream(self.sock)
            self._start_listen(callback)

    @gen.coroutine
    def _start_listen(self, callback):
        while True:
            data = yield gen.Task(self.stream.read_until, b"\r\n")
            flag, data = data[0], data[1:-2]
            if flag != 42:
                raise Exception("unknown reply flag {}".format(chr(flag)))
            reply = []
            length = int(data)
            for i in range(length):
                data = yield gen.Task(self.stream.read_until, b"\r\n")
                flag, data = data[0], data[1:-2]
                if flag != 36:
                    raise Exception("unknown reply flag {}".format(chr(flag)))
                length = int(data) + 2
                data = yield gen.Task(self.stream.read_bytes, length)
                data = data[:-2].decode()
                reply.append(data)
            callback(reply)




if __name__ == '__main__':
    from tornado.ioloop import IOLoop
    sub = redisSub()
    print(sub.subscribe("ch"))
    sub.listen(lambda x: print(x))
    IOLoop.instance().start()
