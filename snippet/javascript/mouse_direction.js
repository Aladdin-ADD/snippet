/*
 * + <http://www.cnblogs.com/rubylouvre/archive/2012/11/06/2757175.html>
 * + <http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction>
 *
 * usage:
 * ```javascript
 * elem.addEventListener('mouseover', function(e) {
 *     var direction = getDirection(this, e);
 *     console.log(direction);
 * }, false);
 * ```
 */

(function() {
	'use strict';

	var cache = Object.create(null);
	this.getDirection = function(elem, event) {
		if (!(elem in cache)) {
			var pos = elem.getBoundingClientRect();
			cache[elem] = {
				'x': pos.left + pos.width / 2,
				'y': pos.top + pos.height / 2
			};
			if (pos.width > pos.height) {
				cache[elem].nx = pos.width / pos.height;
				cache[elem].ny = 1;
			} else {
				cache[elem].nx = 1;
				cache[elem].ny = pos.height / pos.width;
			}
		}

		var o = cache[elem];
		var x = (event.pageX - o.x) * o.nx;
		var y = (event.pageY - o.y) * o.ny;
		var degrees = Math.atan2(y, x) * 57.3; // (180 / Math.PI)
		var direction = undefined;
		if (degrees > 135) direction = 3;
		else if (degrees > 45) direction = 2;
		else if (degrees > -45) direction = 1;
		else if (degrees > -135) direction = 0;
		else direction = 3;
		return direction;
	};
}).call(window);
