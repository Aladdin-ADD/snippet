#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""coroutine wrapper

<http://www.dabeaz.com/talks.html>, modified slightly.
"""

from functools import wraps


def coroutine(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        c = func(*args, **kwargs)
        c.send()
        return c
    return wrapper
