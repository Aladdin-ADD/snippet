#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""escape &, <, >, ", ', `,  , !, @, $, %, (, ), =, +, {, }, [, ]

[There's more to HTML escaping than &, <, >, and "]
(http://wonko.com/post/html-escaping)

[HTML entity reference]
(http://www.howtocreate.co.uk/sidehtmlentity.html)
"""

import re

re_escape = re.compile("""[&<>"'` !@$%()=+{}[\]]""")
escape_dict = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    ' ': '&#x20;', # or &nbsp; ?
    '!': '&#x21;',
    '@': '&#x40;',
    '$': '&#x24;',
    '%': '&#x25;',
    '(': '&#x28;',
    ')': '&#x29;',
    '=': '&#x3d;',
    '+': '&#x2b;',
    '{': '&#x7b;',
    '}': '&#x7d;',
    '[': '&#x5b;',
    ']': '&#x5d;',
}


def escape(value):
    return re_escape.sub(lambda match: escape_dict[match.group(0)], value)


def main():
    import sys
    if len(sys.argv) == 2:
        s = escape(sys.argv[1])
    else:
        s = escape(input('>>> '))
    print(s)

if __name__ == '__main__':
    main()
