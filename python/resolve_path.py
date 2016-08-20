#!/usr/bin/env python3

import os.path
import inspect


def resolve(path):
    file = inspect.getsourcefile(inspect.currentframe())
    curr_dir = os.path.dirname(os.path.abspath(file))
    #  curr_dir = os.path.dirname(__file__)
    resolved = os.path.normpath(os.path.join(curr_dir, path))
    return resolved


if __name__ == '__main__':
    print(resolve('.'))
