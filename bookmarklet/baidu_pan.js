(function() {
	'use strict';

	var result = [];

	var buttom = document.querySelector('#downFileButtom');
	if (buttom !== null) {
		/*one file*/
		var name = document.querySelector('h2.b-fl.ellipsis');
		result.push([name.title, buttom.href]);
	} else {
		/*directory*/
		if (window.location.hash) {
			/* sub directory */
			var listUrl = 'http://pan.baidu.com/share/list' +
			window.location.search +
				window.location.hash.replace('#dir/path=', '&dir=') +
				'&channel=chunlei&clienttype=0&web=1&page=1';
			var xhr = new XMLHttpRequest();
			xhr.open('get', listUrl, false);
			xhr.send(null);
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				var resp = JSON.parse(xhr.responseText);
				resp.list.forEach(function(elem) {
					result.push([elem.server_filename, elem.dlink]);
				});
			}
		} else {
			/* whole directory */
			var script = document.querySelectorAll('script')[9].firstChild;
			var textList = script.wholeText.replace(/\\/g, '').split(';');
			textList.splice(0, 7);
			textList.pop();
			var tmpList;
			var filename;
			var dlink;
			textList.forEach(function(elem) {
				tmpList = elem.split('}', 1)[0].split('"');
				filename = decodeURI(tmpList[0]).replace(' filename=', '');
				dlink = tmpList[4];
				result.push([filename, dlink]);
			});
		}
	}

	output(result);

/*****************************************************************************/

	var addTasks = function(remote, filelist, pop) {
		/*use jsonrpc to add tasks*/
		if (filelist.length === 0) return;
		var conn = new WebSocket(remote);
		conn.onopen = function(e) {
			var data = [];
			filelist.forEach(function(elem) {
				data.push({
					'jsonrpc': '2.0',
					'id': 'blahblah',
					'method': 'aria2.addUri',
					'params': [[elem[1]], {'out': elem[0]}] /* url, name */
				});
			});
			conn.send(JSON.stringify(data));
		};
		conn.onmessage = function(e) {
			var data = JSON.parse(e.data);
			if (data instanceof Array) {
				pop.alert('ok.');
				conn.close();
			}
		};
	};

	function output(res) {
		var html = '<style>';
		html += 'form{margin:0}form input{font-size:100%;margin:0;vertical-align:baseline;line-height:normal}form input[type="text"]{width:30em;padding:.5em .6em;display:inline-block;border:1px solid #ccc;font-size:.8em;box-shadow:inset 0 1px 3px #ddd;border-radius:4px;transition:.3s linear border;box-sizing:border-box}form input[type="checkbox"]{margin:.5em}form input[type="text"]:focus,form input[type="checkbox"]:focus{outline:0;border-color:#129fea}form label{margin:.5em 1em .2em;font-size:90%}div{margin:.5em 0}div:hover{background-color:#ace}';
		html += '</style>';
		html += '<form>';
		html += '<label>JSON RPC path: ';
		html += '<input type="text" value="ws://localhost:6800/jsonrpc" id="remote" />';
		html += '</label>';
		res.forEach(function(elem) {
			html += '<div class="file">';
			html += '<input type="checkbox" checked />';
			html += '<label>filename: <input type="text" name="name" value="' + elem[0] + '" /></label>';
			html += '<a href="' + elem[1] + '">' + elem[0] + '</a>';
			html += '</div>';
		});
		html += '<input type="submit" value="add to aria2" id="submit" />';
		html += '</form>';

		var pop = window.open('', 'content', 'height=500, width=900, scrollbars=yes');
		var doc = pop.document;
		doc.body.innerHTML = html;

		var forEach = Array.prototype.forEach;
		var divs = doc.querySelectorAll('div.file');
		forEach.call(divs, function(el) {
			el.addEventListener('click', function(e) {
				if (e.target === this) {
					var box = this.querySelector('input[type=checkbox]');
					box.checked = box.checked ? false : true;
				}
			});
		});
		var submit = doc.querySelector('#submit');
		submit.addEventListener('click', function(e) {
			e.preventDefault();
			var remote = doc.querySelector('#remote').value;
			var filelist = [];
			forEach.call(divs, function(el) {
				if (el.querySelector('input[type=checkbox]').checked) {
					filelist.push([
						el.querySelector('input[type=text]').value,
						el.querySelector('a').href
					]);
				}
			});
			addTasks(remote, filelist, pop);
		});
	}
})();
