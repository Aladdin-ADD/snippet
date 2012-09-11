javascript: (function() {
	/*彩色打印*/
	var css = document.styleSheets;
	for (var i = css.length - 1; i >= 0; --i) {
		css[i].media.mediaText += ", print";
	}
	/*隐藏无需打印的元素*/
	var hide = ["#header", "#footer-push", ".pagehead", "#slider .breadcrumb", ".commit", ".meta", "#footer"];
	hide.forEach(function(i) {
		document.querySelector(i).style.display = "none";
	});
	/*样式调整*/
	document.querySelector(".site").style.padding = "0";
	document.querySelector("#files").style.padding = "0";
	var fontStyle = "14px DejaVu Sans Mono";
	document.querySelector(".line_numbers").style.font = fontStyle;
	var code = document.querySelectorAll(".line");
	for (var i = code.length - 1; i >= 0; --i) {
		code[i].style.font = fontStyle;
	}
})()
