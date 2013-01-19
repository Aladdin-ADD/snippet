#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re

# FIXME
# error while open utf-16 file

def convert(ass_file, srt_file):
    re_ass = re.compile(
        r'''(?ix)               # get time and subtitle
        Dialogue:\s\d,
        (\d+:\d\d:\d\d.\d\d),   # start time
        (\d+:\d\d:\d\d.\d\d),   # end time
        (?:[^,]*,){6}
        (.*)$                   # subtitle
        ''')
    re_newline = re.compile(r'(?i)\\n') # replace \N with newline
    re_style = re.compile(r'(?x) \{ [^}]+ \}') # replace style

    COUNT = -1 # subtitle number
    CONN = ' --> '
    LF = '\n'

    def convert_line(ass_line):
        m = re_ass.search(ass_line)

        if not m: # line without subtitle
            return ''

        nonlocal COUNT
        COUNT += 1
        subtitle = re_style.sub('', m.group(3))
        subtitle = re_newline.sub('\n', subtitle)
        return (str(COUNT) + LF +
                m.group(1) + CONN + m.group(2) + LF +
                subtitle + LF + LF)

    with open(ass_file) as ass:
        with open(srt_file, 'w') as srt:
            srt.writelines([convert_line(line) for line in ass])

    print(ass_file, '-->', srt_file)




def main():
    l = len(sys.argv)
    if l == 2:
        ass = sys.argv[1]
        if ass.endswith('.ass'):
            srt = ass.replace('.ass', '.srt')
        else:
            srt = ass + '.srt'
    elif l == 3:
        ass = sys.argv[1]
        srt = sys.argv[2]
    else:
        print('Usage: ass2srt input_file [output_file]')
        return

    convert(ass, srt)




if __name__ == '__main__':
    main()
