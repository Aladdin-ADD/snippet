#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""singleton

<http://www.python.org/dev/peps/pep-0318/#examples>
"""


def singleton(cls):
    instances = {}

    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]

    return getinstance


@singleton
class Example():
    pass
