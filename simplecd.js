javascript: (function() {
	var ss = document.querySelectorAll('div.emulemain input[type=checkbox]');
	for (var i = ss.length - 1; i >= 0; --i) {
		ss[i].checked = true;
	}
	var sub = document.querySelector('#copyselectemule');
	sub.click();
})();
