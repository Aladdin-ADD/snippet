#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""decompress gzip or deflate data

+ <https://github.com/facebook/tornado/blob/master/tornado/util.py>
+ <http://lilydjwg.is-programmer.com/2012/10/27/streaming-gzip-decompression-in-python.36130.html>
"""

import zlib


def decompress(data):
    return zlib.decompress(data, zlib.MAX_WBITS + 16)


def decompress_obj(data):
    d = zlib.decompressobj(zlib.MAX_WBITS + 16)
    return d.decompress(data)
