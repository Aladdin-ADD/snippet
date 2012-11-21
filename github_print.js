//javascript:(function(){for(var b=document.styleSheets,a=b.length-1;0<=a;--a)b[a].media.mediaText="";b=document.querySelectorAll(".header,#footer-push,.pagehead,.breadcrumb,.commit,.meta,#footer");for(a=b.length-1;0<=a;--a)b[a].style.display="none";document.querySelector(".site").style.padding="0";document.querySelector("#files").style.padding="0";b=document.querySelectorAll(".line, .line_numbers");for(a=b.length-1;0<=a;--a)b[a].style.font="14px DejaVu Sans Mono"})();

(function() {
	/*彩色打印*/
	var css = document.styleSheets;
	for (var i = css.length - 1; i >= 0; --i) {
		css[i].media.mediaText = '';
	}
	
	/*隐藏无需打印的元素*/
	var hide = ['.header', '#footer-push', '.pagehead', '.breadcrumb', '.commit', '.meta', '#footer'];
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
