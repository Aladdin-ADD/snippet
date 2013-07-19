javascript: (function() {
	var n2 = document.querySelectorAll('td.post2');
	var n1 = document.querySelectorAll('td.post');
	var len = n2.length;
	var list = [];
	var entity = undefined;
	for (var i = 0; i < len; ++i) {
		entity = n2[i].querySelector('a');
		if (entity) list.push(entity.href);
		entity = n1[i].querySelector('a');
		if (entity) list.push(entity.href);
	}
	document.writeln(list.join('</br>'));
})()
