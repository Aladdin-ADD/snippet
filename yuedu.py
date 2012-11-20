#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re
import json
from urllib.request import urlopen
from base64 import b64decode
from concurrent import futures

from bs4 import BeautifulSoup


re_bookid = re.compile(
    r"""(?ix)
    ^
    https?://yuedu.163.com/source/
    ([-_0-9a-z]{13,})/?
    $
    """)


def get_id(url):
    r = re_bookid.match(url)
    if not r:
        sys.exit("unknown url: " + url)
    else:
        return r.group(1)


def get_json(url):
    with urlopen(url) as src:
        return json.loads(src.read().decode())


class Yuedu():
    def __init__(self, url):
        book_id = get_id(url)

        self.book_url = (
            "http://yuedu.163.com/getBook.do?curChapter=&tradeId=&id="
            + book_id)

        self.chapter_url = (
            "http://yuedu.163.com/getChapterContent.do?sourceUuid="
            + book_id)

    def get_chapter(self, chapter):
        url = (self.chapter_url
               + "&articleUuid=" + chapter["id"]
               + "&bigContentId=" + chapter["bigContentId"])
        j_chapter = get_json(url)
        soup = BeautifulSoup(b64decode(j_chapter["content"]))
        return soup.text

    def get_book(self, portions):
        with futures.ThreadPoolExecutor(max_workers=2) as executor:
            yield from executor.map(self.get_chapter, portions)

    def download(self):
        j_book = get_json(self.book_url)
        with open(j_book["title"] + ".txt", "w") as f:
            for text in self.get_book(j_book["portions"]):
                f.write(text)

        print(j_book["title"] + " download.")


def main():
    if len(sys.argv) == 1:
        print('Usage: yuedu.py urls')
        return

    for url in sys.argv[1:]:
        Yuedu(url).download()


if __name__ == "__main__":
    main()
