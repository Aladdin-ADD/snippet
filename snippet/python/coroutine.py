#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

from collections import deque

class coroutine:
    queue = deque()
    flag_add = True

    @classmethod
    def spawn(cls, thunk):
        cls.queue.append(thunk)

    @classmethod
    def start(cls):
        while cls.queue:
            thunk = cls.queue.popleft()
            try:
                thunk.send(None)
            except StopIteration:
                pass
            else:
                if cls.flag_add:
                    cls.queue.append(thunk)
                else:
                    cls.flag_add = True

    @classmethod
    def quit(cls):
        cls.flag_add = False

    @classmethod
    def thunk(cls, fn):
        return fn()




# example
if __name__ == '__main__':
    @coroutine.thunk
    def task1():
        cnt = 0
        while True:
            yield
            print("hello ", end="")
            cnt += 1
            if cnt > 10:
                coroutine.quit()

    def task2():
        cnt = 0
        while cnt < 20:
            yield
            print("world")
            cnt += 1

    coroutine.spawn(task1)
    coroutine.spawn(task2())

    coroutine.start()
