javascript: (function() {
	'use strict';

	/*base64解码 http://www.webtoolkit.info/javascript-base64.html*/
	var Base64 = {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = Base64._utf8_decode(output);
			return output;
		},
		_utf8_decode: function(utftext) {
			var string = "";
			var i = 0;
			var c = 0, c1 = 0,  c2 = 0, c3 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},
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
		var re_content = /(?:<p>([^<]+)<\/p>)|(?:<span[^>]+>([^<]+)<\/span>)/g;
		var tmp = '';
		var m;
		while(m = re_content.exec(src)) {
			tmp += (m[1] || m[2]) + '\n';
		}
		return tmp;
	};

	/*从url获取图书id*/
	var book_url = window.location.href;
	var re_book_id = /([-_a-z0-9]+)\/?$/;
	var book_id = re_book_id.exec(book_url)[1];

	/*获取图书章节id json*/
	var book_info_url = 'http://yuedu.163.com/getBook.do?id=' + book_id + '&curChapter=&tradeId=';
	var book_info = xhr_get(book_info_url);

	/*获取图书内容*/
	var text = {
		'txt': book_info.title + '\n' + book_info.author + '\n\n\n',
		'output': function() {
			document.write(this.txt.replace(/\n/g, '<br />'));
		},
		'add': function(t) {
			this.txt += t + '\n\n';
		},
		'addChapter': function(chapter) {
			var ch_url = 'http://yuedu.163.com/getChapterContent.do';
			ch_url += '?sourceUuid=' + book_info.id;
			ch_url += '&articleUuid=' + chapter.id;
			ch_url += '&bigContentId=' + chapter.bigContentId;
			var ch_json = xhr_get(ch_url);
			var ch_src = Base64.decode(ch_json.content);
			var ch_data = content_get(ch_src);
			this.add(ch_data);
		},
	};

	/*卷*/
	for (var i = 0, plen = book_info.portions.length; i < plen; ++i) {
		var vol = book_info.portions[i];
		text.add(vol.title);
		text.add(vol.introduction);
		/*章*/
		for (var j = 0, clen = vol.chapter.length; j < clen; ++j) {
			var ch = vol.chapter[j];
			text.add(ch.title);
			text.addChapter(ch);
		}
	}

	/*输出*/
	text.output();
})()
