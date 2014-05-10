#!/usr/bin/env python3

"""
+ https://wiki.archlinux.org/index.php/Color_Bash_Prompt
+ https://github.com/goagent/goagent/
+ https://github.com/facebook/tornado

------

Uasge:

>>> import logging
>>> import color_logging
>>> logger = logging.getLogger(__name__)
>>> logger = color_logging.colorful(logger)
>>> logger.info("example")
"""


from functools import wraps
import curses
import logging
import sys




curses.setupterm()

fg_color = curses.tigetstr("setaf") or curses.tigetstr("setf") or b""

DEFAULT_COLORS = {
    "debug": curses.tparm(fg_color, 4).decode(), # blue
    "info": curses.tparm(fg_color, 2).decode(), # green
    "warning": curses.tparm(fg_color, 3).decode(), # yellow
    "error": curses.tparm(fg_color, 1).decode(), # red
}

_reset_color = curses.tigetstr("sgr0").decode()




def colorful(logger, colors=DEFAULT_COLORS):
    def colored(levelno, color):
        _log = getattr(logger, levelno)
        @wraps(log)
        def wrap(*args, **kwds):
            sys.stderr.write(color)
            _log(*args, **kwds)
            sys.stderr.write(_reset_color)
            sys.stderr.flush()
        return wrap


    for levelno, color in colors.items():
        fn = colored(levelno, color)
        setattr(logger, levelno, fn)

    return logger




if __name__ == "__main__":
    logging.basicConfig(level=logging.NOTSET)
    logger = logging.getLogger(__name__)
    logger = colorful(logger)

    logger.debug("debug")
    print("stdout test")
    logger.info("info")
    logger.warning("warning")
    print("stderr test", file=sys.stderr)
    logger.error("error")
