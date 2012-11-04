#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re

# FIXME
# error while open utf-16 file

def convert(ass_file, srt_file):
    re_ass = re.compile(
        r"""(?ix)
        Dialogue:\s\d,
        (\d+:\d\d:\d\d.\d\d),   # start
        (\d+:\d\d:\d\d.\d\d),   # end
        (?:[^,]*,){6}
        (.*)$                   # text
        """)
    re_newline = re.compile(r"""(?i)\n""")  # replace \N
    re_special = re.compile(r"(?x) \{ [^}]+ \}")  # replace style

    def convert_line(ass_line, line_cnt=[-1], CONN=' --> ', LF='\n'):
        m = re_ass.search(ass_line)
        if not m: return ''
        line_cnt[0] += 1
        text = re_special.sub('', m.group(3))
        text = re_newline.sub('\n', text)
        return (str(line_cnt[0]) + LF +
                m.group(1) + CONN + m.group(2) + LF +
                text + LF + LF)

    with open(ass_file) as ass:
        with open(srt_file, 'w') as srt:
            srt.writelines([convert_line(line) for line in ass])


def main():
    if len(sys.argv) == 2:
        ass = sys.argv[1]
        if ass.endswith(".ass"):
            srt = ass.replace(".ass", ".srt")
        else:
            srt = ass + ".srt"
    elif len(sys.argv) == 3:
        ass = sys.argv[1]
        srt = sys.argv[2]
    else:
        print("Usage: ass2srt ass_file [srt_file]")
        return

    convert(ass, srt)


if __name__ == '__main__':
    main()
