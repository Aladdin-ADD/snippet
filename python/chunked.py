#!/usr/bin/env python3

import io


def chunked_handler(data):
    """http://tools.ietf.org/html/rfc2616#section-3.6.1"""
    buf = io.BytesIO(data)
    ret = io.BytesIO()

    while True:
        size_header = buf.readline()
        parts = size_header.split(b";")
        size = int(parts[0], 16)
        if size:
            ret.write(buf.read(size))
        else:
            break
        crlf = buf.readline()

    return ret.getvalue()

