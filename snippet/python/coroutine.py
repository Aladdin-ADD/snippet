#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""coroutine wrapper

<http://www.dabeaz.com/talks.html>, modified slightly.
"""

from functools import wraps


def coroutine(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        co = func(*args, **kwargs)
        next(co)
        return co
    return wrapper
