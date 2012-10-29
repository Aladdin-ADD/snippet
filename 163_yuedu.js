javascript: (function() {
	'use strict';

	/*
	 * 好像大部分浏览器都实现了atob这个函数，直接用了。
	 * 有问题去翻一下之前的版本，用js解码base64的。
	 * decodeURIComponent和escape能解决乱码问题，mdn上找的。
	 */
	var base64decode = function(data) {
		return decodeURIComponent(escape(window.atob(data)));
	};

	/*xhr get请求 返回json*/
	var xhr_get = function(url) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, false);
		xhr.send(null);
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			return JSON.parse(xhr.responseText);
		} else {
			console.log('readState: ' + xhr.readyState + 'status: ' + xhr.status);
			throw new Error('xhr fail');
		}
	};

	/*获取正文*/
	var content_get = function(src) {
		var s = src.replace(/<\/?span[^>]*>/ig, '');
		var re_content = /<p[^>]*>([^<]+)<\/p>/ig;
		var tmp = '';
		var m;
		while(m = re_content.exec(s)) {
			tmp += m[1] + '\n';
		}
		return tmp;
	};

	var get_book = function() {
		/*从url获取图书id*/
		var book_url = window.location.href;
		var re_book_id = /([-_a-z0-9]+)\/?$/;
		var book_id = re_book_id.exec(book_url)[1];

		/*获取图书章节id json*/
		var book_info_url = 'http://yuedu.163.com/getBook.do?curChapter=&tradeId=&id=' + book_id;
		var book_info = xhr_get(book_info_url);

		/*获取图书内容*/
		var text = {
			'txt': book_info.title + '\n' + book_info.author + '\n\n',
			'output': function() {
				var pop_window = window.open('', 'content', 'height=400, width=840, scrollbars=yes');
				pop_window.document.write(this.txt.replace(/\n/g, '<br />'));
			},
			'add': function(t) {
				this.txt += t + '\n';
			},
			'addChapter': function(chapter) {
				var ch_url = 'http://yuedu.163.com/getChapterContent.do';
				ch_url += '?sourceUuid=' + book_info.id;
				ch_url += '&articleUuid=' + chapter.id;
				ch_url += '&bigContentId=' + chapter.bigContentId;
				var ch_json = xhr_get(ch_url);
				var ch_src = base64decode(ch_json.content);
				var ch_data = content_get(ch_src);
				this.add(ch_data);
			},
		};

		/*卷*/
		for (var i = 0, plen = book_info.portions.length; i < plen; ++i) {
			var vol = book_info.portions[i];
			text.add(vol.title + '\n' + vol.introduction + '\n');
			/*章*/
			for (var j = 0, clen = vol.chapter.length; j < clen; ++j) {
				var ch = vol.chapter[j];
				text.add(ch.title);
				text.addChapter(ch);
			}
		}

		/*输出*/
		text.output();
	};

	get_book();
})()
