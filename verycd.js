//把verycd页面里的ed2k连接提取出来
//javascript:(function(){var n2=document.querySelectorAll('td.post2');var n1=document.querySelectorAll('td.post');var len=n1.length;var list=[];for(var i=0;i<len;++i){var nn2=n2[i].querySelector('a');if (nn2) list.push(nn2.href);var nn1=n1[i].querySelector('a');if (nn1) list.push(nn1.href);}document.writeln(list.join('</br>'));})()

javascript: (function() {
	var n2 = document.querySelectorAll('td.post2');
	var n1 = document.querySelectorAll('td.post');
	var len = n1.length;
	var list = [];
	for (var i = 0; i < len; ++i) {
		var nn2 = n2[i].querySelector('a');
		if (nn2) list.push(nn2.href);
		var nn1 = n1[i].querySelector('a');
		if (nn1) list.push(nn1.href);
	}
	document.writeln(list.join('</br>'));
})()
