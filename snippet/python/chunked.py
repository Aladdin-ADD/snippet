#!/usr/bin/env python3
# -*- coding: utf-8 -*-


from io import BytesIO


def handle_chunked(data):
    """decode chunked data.
    see <http://tools.ietf.org/html/rfc2616#section-3.6.1> for details.
    """
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
