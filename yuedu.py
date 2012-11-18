#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re
import json
from urllib.request import urlopen
from base64 import b64decode

from bs4 import BeautifulSoup


prefix_book = "http://yuedu.163.com/getBook.do?curChapter=&tradeId=&id="
prefix_chapter = "http://yuedu.163.com/getChapterContent.do?sourceUuid="
re_bookid = re.compile(r"(?i)\b([-_0-9a-z]+)/?$")


def get_json(url):
    with urlopen(url) as src:
        return json.loads(src.read().decode())


def get_chapter(ch):
    url = (prefix_chapter
           + "&articleUuid=" + ch["id"]
           + "&bigContentId=" + ch["bigContentId"])
    j_chapter = get_json(url)
    soup = BeautifulSoup(b64decode(j_chapter["content"]))
    return soup.text


def get_book(book_id):
    j_book = get_json(prefix_book + book_id)
    global prefix_chapter
    prefix_chapter += book_id
    with open(j_book["author"] + " - " + j_book["title"] + '.txt', "w") as f:
        for portion in j_book["portions"]:
            f.writelines(get_chapter(portion))


def main():
    if len(sys.argv) != 2:
        print('Usage: yuedu.py url/id')
        return

    r = re_bookid.search(sys.argv[1])
    if not r:
        print('unknown url.')
        return

    get_book(r.group(1))
    print('download.')


if __name__ == "__main__":
    main()
