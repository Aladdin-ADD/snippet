/*
 * Usage:
 * var output = tmpl('id', 'data');
 * var output = tmpl('id').generate('data');
 * var output = tmpl.template('string').generate('data');
 *
 * Syntax:
 * {{ expr }}
 * {% if (...) %}... {% else if (...) %}... {% else %}... {% end %}
 * {% for (...; ...; ...) %}... {% end %}
 */

(function() {
	'use strict';

	var template = function(str) {
		var compiled = '"use strict";var output="' +
			str.replace(/\s+/g, ' ')
			.replace(/{{/g, '"+')
			.replace(/}}/g, '+"')
			.replace(/{%\s?else/g, '";}else')
			.replace(/{%\s?end\s?%}/g, '";}output+="')
			.replace(/{%/g, '";')
			.replace(/%}/g, '{output+="') +
			'";return output;';
		//console.log(compiled);
		return {'generate': new Function('ns', compiled)};
	};

	var cache = Object.create(null);
	var tmpl = function(id, data) {
		if (! (id in cache))
			cache[id] = template(document.getElementById(id).innerHTML);
		return data ? cache[id].generate(data) : cache[id];
	};
	tmpl.template = template;

	this.tmpl = tmpl;
}).call(window);
