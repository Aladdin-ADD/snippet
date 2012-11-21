#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re
import json
from urllib.request import urlopen
from base64 import b64decode

from bs4 import BeautifulSoup


re_bookid = re.compile(
    r"""(?ix)
    ^
    https?://yuedu.163.com/source/
    ([-_0-9a-z]{13,})/?
    $
    """)


def get_json(url):
    with urlopen(url) as src:
        return json.loads(src.read().decode())


def get_book(url):
    match = re_bookid.match(url)
    if not match:
        print("unknown url: " + url)
        return

    book_url = (
        "http://yuedu.163.com/getBook.do?curChapter=&tradeId=&id=" +
        match.group(1))
    chapter_url = (
        "http://yuedu.163.com/getChapterContent.do?sourceUuid=" +
        match.group(1))

    j_book = get_json(book_url)

    with open(j_book["title"] + ".txt", "w") as f:
        for text in get_chapters(chapter_url, j_book["portions"]):
            f.write(text)

def get_chapters(prefix, portions):
    for portion in portions:
        url = (prefix
             + "&articleUuid=" + portion["id"]
             + "&bigContentId=" + portion["bigContentId"])

        j_chapter = get_json(url)
        soup = BeautifulSoup(b64decode(j_chapter["content"]))
        yield soup.text


def main():
    if len(sys.argv) == 1:
        print('Usage: yuedu.py urls')
        return

    for url in sys.argv[1:]:
        get_book(url)


if __name__ == "__main__":
    main()
