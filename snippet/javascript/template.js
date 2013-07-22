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
	var template = function(str) {
		var compiled = '(function(data){with(data){var code="' +
			str.replace(/\s+/g, ' ')
			.replace(/{{/g, '"+')
			.replace(/}}/g, '+"')
			.replace(/{%\s?end\s?%}/g, '";}code+="')
			.replace(/{%\s?else/g, '";}else')
			.replace(/{%/g, '";').replace(/%}/g, '{code+="') +
			'";}return code;})';
		return { generate: eval(compiled) };
	};

	var cache = {};
	var tmpl = function(id, data) {
		if (!(id in cache))
			cache[id] = template(document.getElementById(id).innerHTML);
		return data ? cache[id].generate(data) : cache[id];
	};
	tmpl.template = template;

	window.tmpl = tmpl;
})();
