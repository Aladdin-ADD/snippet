/*
 * use `Object.prototype.toString` to detect object type.
 *
 * usage:
 * >>> var t = type(object);
 *
 * `new Date()` is Date object, but `Date()` is String object.
 * `NaN` and `Infinity` are Number object.
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray
 * http://underscorejs.org/docs/underscore.html
 */

(function() {
	'use strict';
	var toString = Object.prototype.toString;
	this.type = function(o) {
		var t = toString.call(o);
		if (t === '[object Number]') {
			if (isNaN(o))
				return 'NaN';
			else if (!isFinite(o))
				return 'Infinity';
		}
		return t.slice(8, -1);
	};
}).call(window);
