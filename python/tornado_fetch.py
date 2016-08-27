#!/usr/bin/env python3

from tornado.httpclient import AsyncHTTPClient, HTTPError
import json
import urllib.parse as urlparse


AsyncHTTPClient.configure('tornado.curl_httpclient.CurlAsyncHTTPClient')


class httpclient:
    _httpclient = AsyncHTTPClient()

    @staticmethod
    def _update_query(url, query):
        url_part = []

        obj = urlparse.urlparse(url)
        url_part.append(obj.scheme)
        url_part.append('://')
        url_part.append(obj.netloc)
        url_part.append(obj.path)

        if obj.query:
            old_query = urlparse.parse_qs(obj.query)
            old_query.update(query)
            query = old_query
        url_part.append('?')
        url_part.append(urlparse.urlencode(query, doseq=True))

        if obj.fragment:
            url_part.append('#')
            url_part.append(obj.fragment)

        return ''.join(url_part)

    @classmethod
    async def get(cls, url, query=None, timeout=20.0):
        if query: url = cls._update_query(url, query)
        resp = await cls._httpclient.fetch(url, request_timeout=timeout)
        return resp

    @classmethod
    async def post(cls, url, body=None,
                   content_type='application/json', timeout=20.0):
        if body: body = json.dumps(body)
        resp = await cls._httpclient.fetch(
            url, method='POST', body=body,
            headers={'Content-Type': content_type},
            request_timeout=timeout)
        return resp


if __name__ == '__main__':
    from tornado.ioloop import IOLoop
    async def test():
        resp = await httpclient.get('https://httpbin.org/get', {'a': 1})
        print(resp)
        resp = await httpclient.get('https://httpbin.org/get?a=2', {'a': 1})
        print(resp)
        resp = await httpclient.get('https://httpbin.org/get?b=1', {'a': 1})
        print(resp)

        resp = await httpclient.post('https://httpbin.org/post', {'a': 1})
        print(resp)
    IOLoop.instance().run_sync(test)
