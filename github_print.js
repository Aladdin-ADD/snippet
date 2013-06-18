(function() {
	'use strict';

	var i;

	/*隐藏无需打印的元素*/
	var hide = [
		'#footer-push',
		'#footer',
		'.header',
		'.pagehead',
		'.repository-sidebar',
		'.file-navigation',
		'.commit',
		'.meta'
	];
	var node = document.querySelectorAll(hide.join(','));
	for (i = node.length - 1; i >= 0; --i) {
		node[i].style.display = 'none';
	}

	/*调整样式*/
	document.querySelector('#files').style.padding = '0';
	var lines = document.querySelectorAll('.line, td.blob-line-nums span');
	for (i = lines.length - 1; i >= 0; --i) {
		lines[i].style.font = '15px Monaco';
		lines[i].style.backgroundColor = '';
	}
})();
