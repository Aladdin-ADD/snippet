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
import logging
import sys




color_dict = {
    "txtrst": "\033[0m", # Text Reset

    "txtblk": "\033[0;30m", # Black - Regular
    "txtred": "\033[0;31m", # Red
    "txtgrn": "\033[0;32m", # Green
    "txtylw": "\033[0;33m", # Yellow
    "txtblu": "\033[0;34m", # Blue
    "txtpur": "\033[0;35m", # Purple
    "txtcyn": "\033[0;36m", # Cyan
    "txtwht": "\033[0;37m", # White

    "bldblk": "\033[1;30m", # Black - Bold
    "bldred": "\033[1;31m", # Red
    "bldgrn": "\033[1;32m", # Green
    "bldylw": "\033[1;33m", # Yellow
    "bldblu": "\033[1;34m", # Blue
    "bldpur": "\033[1;35m", # Purple
    "bldcyn": "\033[1;36m", # Cyan
    "bldwht": "\033[1;37m", # White

    "unkblk": "\033[4;30m", # Black - Underline
    "undred": "\033[4;31m", # Red
    "undgrn": "\033[4;32m", # Green
    "undylw": "\033[4;33m", # Yellow
    "undblu": "\033[4;34m", # Blue
    "undpur": "\033[4;35m", # Purple
    "undcyn": "\033[4;36m", # Cyan
    "undwht": "\033[4;37m", # White

    "bakblk": "\033[40m", # Black - Background
    "bakred": "\033[41m", # Red
    "bakgrn": "\033[42m", # Green
    "bakylw": "\033[43m", # Yellow
    "bakblu": "\033[44m", # Blue
    "bakpur": "\033[45m", # Purple
    "bakcyn": "\033[46m", # Cyan
    "bakwht": "\033[47m", # White
}




def colorful(logger, colors=None):
    # set color
    _reset = "\033[0m"
    _colors = {
        "debug": "\033[0;34m", # blue
        "info": "\033[0;32m", # green
        "warning": "\033[0;33m", # yellow
        "error": "\033[0;31m", # red
    }
    if colors is not None:
        _colors.update(colors)

    stderr = sys.stderr
    # decorator
    def setup_color(log, color):
        @wraps(log)
        def wrapped(*args, **kwds):
            stderr.write(color)
            log(*args, **kwds)
            stderr.write(_reset)
            stderr.flush()
        return wrapped

    # modify logger
    for level, color in _colors.items():
        log = getattr(logger, level)
        log = setup_color(log, color)
        setattr(logger, level, log)

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
