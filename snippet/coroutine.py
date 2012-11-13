#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""coroutine wrapper
from <http://www.dabeaz.com/talks.html> and modified slightly.
"""

from functools import wraps


def coroutine(func):
    @wraps(func)
    def start(*args, **kwargs):
        f = func(*args, **kwargs)
        next(f)
        return f
    return start
