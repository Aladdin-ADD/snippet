#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""escape &, <, >, ", ', `,  , !, @, $, %, (, ), =, +, {, }, [, ]

[There's more to HTML escaping than &, <, >, and "]
(http://wonko.com/post/html-escaping)

[HTML entity reference]
(http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
"""

import re

re_escape = re.compile("""[&<>"'` !@$%()=+{}[\]]""")
escape_dict = {
    "&": "&#x26;",
    "<": "&#x3C;",
    ">": "&#x3E;",
    '"': "&#x22;",
    "'": "&#x27;",
    "`": "&#x60;",
    " ": "&#x20;",
    "!": "&#x21;",
    "@": "&#x40;",
    "$": "&#x24;",
    "%": "&#x25;",
    "(": "&#x28;",
    ")": "&#x29;",
    "=": "&#x3D;",
    "+": "&#x2B;",
    "{": "&#x7B;",
    "}": "&#x7D;",
    "[": "&#x5B;",
    "]": "&#x5D;",
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
