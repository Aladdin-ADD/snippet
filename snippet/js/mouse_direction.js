/*
 * [rubylouvre](http://www.cnblogs.com/rubylouvre/archive/2012/11/06/2757175.html)
 */

(function() {
	'use strict';
	
	var directionArray = [3,0,1,2,3];
	this.getDirection = function(elem, event) {
		var w = elem.offsetWidth;
		var h = elem.offsetHeight;
		var x = (event.clientX-elem.offsetLeft-(w/2))*(w>h?(h/w):1);
		var y = (event.clientY-elem.offsetTop-(h/2))*(h>w?(w/h):1);
		var i = Math.round(Math.atan2(y, x)*0.636+2);
		return directionArray[i];
	};
}).call(window);

(function() {
	var el = document.getElementById('id');
	el.addEventListener('mouseout', function(e) {
		var direction = getDirection(this, e);
		console.log(direction);
	}, false);
	el.addEventListener('mouseover', function(e) {
		var direction = getDirection(this, e);
		console.log(direction);
	}, false);
})();
