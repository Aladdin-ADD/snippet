javascript: (function() {
	/*彩色打印*/
	var css = document.styleSheets;
	for (var i = css.length - 1; i >= 0; --i) {
		css[i].media.mediaText = '';
	}
	/*隐藏无需打印的元素*/
	var hide = ['#header', '#footer-push', '.pagehead', '.breadcrumb', '.commit', '.meta', '#footer'];
	var node = document.querySelectorAll(hide.join(','));
	for (var i = node.length - 1; i >= 0; --i) {
		node[i].style.display = 'none';
	}
	/*调整样式*/
	document.querySelector('.site').style.padding = '0';
	document.querySelector('#files').style.padding = '0';
	var lines = document.querySelectorAll('.line, .line_numbers');
	var fontStyle = '14px DejaVu Sans Mono';
	for (var i = lines.length - 1; i >= 0; --i) {
		lines[i].style.font = fontStyle;
	}
})()
