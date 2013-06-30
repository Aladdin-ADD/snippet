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

	var addTasks = function(remote, filelist) {
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
			conn.close();
		};
	};

	function output(res) {
		var html = '<form action="">';
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

		var pop = window.open('', 'content', 'height=600, width=800, scrollbars=yes');
		var doc = pop.document;
		doc.body.innerHTML = html;
		doc.body.addEventListener('click', function(e) {
			/*click submit to add tasks*/
			if (e.target.id === "submit") {
				e.preventDefault();
				var remote = doc.querySelector('#remote').value;
				var filelist = [];
				var div = doc.querySelectorAll('div.file');
				for (var i = div.length - 1; i >= 0; --i) {
					if (div[i].querySelector('input[type=checkbox]').checked) {
						filelist.push([
							div[i].querySelector('input[type=text]').value,
							div[i].querySelector('a').href
						]);
					}
				}
				addTasks(remote, filelist);
				pop.alert('ok.');
			}
		}, false);
	}
})();
