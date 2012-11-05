/*
 * Usage:
 * var t = template("template string");
 * var outpot = t.generate("json");
 *
 * Syntax:
 * {{ expression }}
 * {% if expression %}...{% else if expression %}...{% else %}...{% end %}
 * {% for index in list %}...{{ list[index] }}...{% end %}
 * {% for key in object %}...{{ object[key] }}...{% end %}
 */


(function() {
	'use strict';

	var tmpl = function(str) {
		var compiled = 'var s="";';
		var addText = function(text) {
			compiled += 's+="' + text + '";';
		};
		var addExpression = function(expression) {
			var e = expression.replace(/["'.[\]]+/g, ' ').trim().split(' ');
			compiled += 's+=_namespace_';
			while (e.length) compiled += '["' + e.shift() + '"]';
			compiled += ';';
		};
		var addReturn = function() {
			compiled += 'return s;';
		};
		var parse = function(str, start) {
			var s = start || 0;
			var i = 0, j = 0, c = undefined;
			var expression = undefined, statement = undefined;
			while (true) {
				i = str.indexOf('{', s);
				if (i === -1) {
					addText(str.substring(s));
					break;
				}
				addText(str.substring(s, i));
				c = str.charAt(i + 1);
				if (c === '{') { // {{ express }}
					j = str.indexOf('}}', i + 2);
					if (j === -1) throw new SyntaxError('}} not found');
					expression = str.substring(i + 2, j);
					addExpression(expression);
					s = j + 2;
				} else if (c === '%') {
					j = str.indexOf('%}', i + 2);
					if (j === -1) throw new SyntaxError('%} not found');
					statement = str.substring(i + 2, j).trim().split(' ');
					if (statement[0] === 'if') {
					} else if (statement[0] === 'for') {
					} else if (statement[0] === 'end') {
					} else {
						throw new SyntaxError('unknown statement');
					}
					s = j + 2;
				} else {
					addText(c);
					s = i + 1;
				}
			}
			addReturn();
		};
		parse(str);
		return new Function('_namespace_', compiled);
	};

	var template = function(str) {
		var execute = tmpl(str);
		//console.log(execute);
		var generate = function(data) {
			return execute(data);
		};
		return {'generate': generate};
	};

	window.template = template;
})();


var test = function() {
	function equal(input, output, data) {
		var o = template(input).generate(data);
		if (o === output) {
			console.log('PASS');
			console.log('\n');
		} else {
			console.log('FAIL');
			console.log('input: ' + input);
			console.log('except: ' + output);
			console.log('output: ' + o);
			console.log('\n');
		}
	}

	// expression test
	var oo = 'hello, world!';
	equal('hello, world!', oo);
	equal('hello, {{ world }}!', oo, {'world':'world'});
	equal('hello, {{ data[0] }}!', oo, {'data': ['world']});
	equal('hello, {{ data.world }}!', oo, {'data': {'world':'world'}});
	equal('hello, {{ data.world.w }}!', oo, {'data': {'world':{'w':'world'}}});
	equal("hello, {{ data['world'] }}!", oo, {'data': {'world':'world'}});
	equal('hello, {{ data["world"] }}!', oo, {'data': {'world':'world'}});
};
test();
