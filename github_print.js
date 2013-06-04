(function() {
	var i;

	/*隐藏无需打印的元素*/
	var hide = ['.header', '.pagehead', '.frame-meta', '.meta', '#footer', '#footer-push', '#js-frame-loading-template'];
	var node = document.querySelectorAll(hide.join(','));
	for (i = node.length - 1; i >= 0; --i) {
		node[i].style.display = 'none';
	}

	/*调整样式*/
	document.querySelector('#slider').style.margin = '0';
	var lines = document.querySelectorAll('.line, td.blob-line-nums span');
	var fontStyle = '14px Monaco';
	for (i = lines.length - 1; i >= 0; --i) {
		lines[i].style.font = fontStyle;
	}
})();
