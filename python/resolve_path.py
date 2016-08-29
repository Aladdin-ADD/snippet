#!/usr/bin/env python3

import os.path
import inspect


def resolve(path):
    #  filename = sys._getframe().f_back.f_code.co_filename
    file_path = inspect.getabsfile(inspect.currentframe())
    curr_dir = os.path.dirname(file_path)
    #  curr_dir = os.path.dirname(__file__)
    resolved = os.path.normpath(os.path.join(curr_dir, path))
    return resolved


if __name__ == '__main__':
    print(resolve('.'))
    print(resolve('../bash'))
