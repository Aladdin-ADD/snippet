#!/usr/bin/env pypy
# -*- coding: utf-8 -*-

# TODO
# 没测试过有没编码问题

import sys
import os.path
import re

def main():
    # 少了ass参数 或 ass文件不存在
    # 提示并退出
    if len(sys.argv) == 1 or \
       not os.path.exists(sys.argv[1]):
        sys.exit('... miss argument OR subtitle file not exist')

    # 将ass转换为srt
    convert_to_srt(sys.argv[1])

def convert_to_srt(ass_file):
    # srt文件名
    srt_name = os.path.basename(ass_file).replace('.ass','.srt')
    # srt文件已存在时 覆盖或是重命名srt文件
    if os.path.exists(srt_name):
        print '... ' + srt_name + ' exist!\n... overwrite it? [y/n]'
        ch = raw_input('>>> ')
        if ch == 'n':
            from datetime import datetime
            dd = datetime.now().strftime('%f_')
            srt_name = dd + srt_name

    # 提取ass字幕的正则表达式
    re_ass = re.compile(
        r'''(?ix)
        ^Dialogue:\s\d,
        (\d+:\d\d:\d\d.\d\d),   # start
        (\d+:\d\d:\d\d.\d\d),   # end
        (?:[^,]*,){6}
        (.*)$                   # text
        ''')

    # 用于将\N\n转换为换行符
    re_newline = re.compile(r'(?i)\\n')
    # 删除各种特效
    re_special_char = re.compile(r'\{[^}]+\}')

    def ass2srt(line, cnt=[-1], CONN=' --> ', LF='\n'):
        """convert ass to srt"""
        m = re_ass.match(line)
        if not m: return ''
        cnt[0] += 1
        text = re_special_char.sub('', m.group(3))
        text = re_newline.sub('\n', text)
        return str(cnt[0]) + LF + \
                m.group(1) + CONN + m.group(2) + LF + \
                text + LF*2

    # 读取ass文件并写入srt文件
    with open(srt_name, 'w') as srt:
        with open(ass_file) as ass:
            for ass_line in ass:
                srt.write(ass2srt(ass_line))

if __name__ == '__main__':
    main()
