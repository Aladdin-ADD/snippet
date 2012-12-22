/*
 * use `Object.prototype.toString` to detect object type.
 * more details: http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html
 *
 * usage:
 * >>> var t = type(anyObject);
 * Arguments, Array, Boolean, Data, Error, Function, JSON,
 * Math, Null, Number, Object, RegExp, String, Undefined
 *
 * `new Date()` is Date object, but `Date()` is String object.
 * `NaN` and `Infinity` are Number object.
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray
 * http://underscorejs.org/docs/underscore.html
 * http://stackoverflow.com/questions/10357481/how-can-i-determine-that-an-object-is-custom-in-javascript
 */

(function() {
	'use strict';
	var toString = Object.prototype.toString;
	var ht = {
		'[object Arguments]': 'Arguments',
		'[object Array]': 'Array',
		'[object Boolean]': 'Boolean',
		'[object Date]': 'Date',
		'[object Error]': 'Error',
		'[object Function]': 'Function',
		'[object JSON]': 'JSON',
		'[object Math]': 'Math',
		'[object Null]': 'Null',
		'[object Number]': 'Number',
		'[object Object]': 'Object',
		'[object RegExp]': 'RegExp',
		'[object String]': 'String',
		'[object Undefined]': 'Undefined'
	};
	this.type = function(o) {
		return ht[toString.call(o)];
	};
}).call(window);

(function test() {
	'use strict';
	console.log(type(JSON) === 'JSON');
	console.log(type(Math) === 'Math');
	console.log(type(arguments) === 'Arguments');
	console.log(type(new Array()) === 'Array');
	console.log(type(new Boolean()) === 'Boolean');
	console.log(type(new Date()) === 'Date');
	console.log(type(new Error()) === 'Error');
	console.log(type(new Function()) === 'Function');
	console.log(type(new Number()) === 'Number');
	console.log(type(new Object()) === 'Object');
	console.log(type(new RegExp()) === 'RegExp');
	console.log(type(new String()) === 'String');
	console.log(type(null) === 'Null');
	console.log(type(undefined) === 'Undefined');
}).call(window);
