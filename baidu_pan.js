(function() {
	var result;
	var dlink = document.querySelector('#downFileButtom');
	if (dlink !== null) {
		var name = document.querySelector('h2.b-fl.ellipsis');
		result = [[name.title, dlink.href]];
	} else {
		result = fromDirectory();
	}
	output(result);

	function fromDirectory() {
		var listUrl = 'http://pan.baidu.com/share/list' +
			window.location.search +
			window.location.hash.replace('#dir/path=', '&dir=') +
			'&channel=chunlei&clienttype=0&web=1&page=1';
		var xhr = new XMLHttpRequest();
		xhr.open('get', listUrl, false);
		xhr.send(null);
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			response = JSON.parse(xhr.responseText);
			return response.list.map(function (item) {
				return [item.server_filename, item.dlink];
			});
		} else {
			console.log('readState: ' + xhr.readyState + 'status: ' + xhr.status);
			throw new Error('xhr fail');
		}
	}

	function output(res) {
		console.log(res);

		var list = ['</ul>'];
		var text = ['</p></div>'];
		for (var i = res.length - 1; i >= 0; i--) {
			list.unshift('<li><a href="' + res[i][1] + '">' + res[i][0] + '</a></li>');
			text.unshift(res[i][1]);
		}
		list.unshift('<ul>');
		text.unshift('<div><p>');
		var node = '<div>' + list.join('') + text.join('</p><p>') + '</div>';
		var pop_window = window.open('', 'content', 'height=600, width=600, scrollbars=yes');
		pop_window.document.body.innerHTML = node;
	}
})();
