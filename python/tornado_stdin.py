#!/usr/bin/env python3

#  http://stackoverflow.com/questions/35741435/how-to-listen-for-event-of-closed-stdin-in-a-tornado-loop

import sys
from tornado.ioloop import IOLoop


async def handle(line):
    print('> %s\n' % line.strip())


def main():
    ioloop = IOLoop.instance()
    ioloop.add_handler(
        sys.stdin,
        lambda fd, event: ioloop.add_callback(handle, fd.readline()),
        IOLoop.READ)

    print('waiting input ...\n')
    try:
        ioloop.start()
    except KeyboardInterrupt:
        print('\nbye')
        exit(0)


if __name__ == '__main__':
    main()
