#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re
import json
from base64 import b64decode
from bs4 import BeautifulSoup
from asynclient import asynclient


re_bookid = re.compile(
    r"""(?ix)
    ^
    https?://yuedu.163.com/source/
    ([-_0-9a-z]{13,})/?
    $
    """)




def get_text(container, index):
    def cb(response):
        j_chapter = json.loads(response.body.decode())
        soup = BeautifulSoup(b64decode(j_chapter["content"]))
        container[index] = soup.text
    return cb




def get_chapters(chapter_prefix, client, container):
    def cb(response):
        j_book = json.loads(response.body.decode())
        length = len(j_book["portions"])
        chapter_content = [None] * length
        for i, portion in zip(range(length), j_book["portions"]):
            url = (chapter_prefix
                   + "&articleUuid=" + portion["id"]
                   + "&bigContentId=" + portion["bigContentId"])
            client.get(url, callback=get_text(chapter_content, i))
        container.append({"title": j_book["title"], "texts":chapter_content})
    return cb




def get_book(urls):
    client = asynclient()

    book_prefix = "http://yuedu.163.com/getBook.do?curChapter=&tradeId=&id="
    chapter_prefix = "http://yuedu.163.com/getChapterContent.do?sourceUuid="

    book_list = []

    for url in urls:
        match = re_bookid.match(url)
        if match:
            client.get(
                book_prefix + match.group(1),
                callback=get_chapters(
                    chapter_prefix + match.group(1),
                    client,
                    book_list))
        else:
            print("invalid url: " + url)

    client.start()

    for book in book_list:
        with open(book["title"] + ".txt", "w") as f:
            f.writelines(book["texts"])
        print("「{}.txt」download.".format(book["title"]))




def main():
    if len(sys.argv) == 1:
        print('Usage: yuedu.py urls')
        return

    get_book(sys.argv[1:])



if __name__ == "__main__":
    main()
