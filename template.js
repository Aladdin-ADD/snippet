/*
 * Usage:
 * var t = template("template string");
 * var outpot = t.generate("json data");
 *
 * Syntax:
 * {{ expression }}
 * {% if expression %}... {% else if expression %}... {% else %}... {% end %}
 * NOTE: if statement does not support function in expression now.
 * {% for index in list %}... {{ list[index] }}... {% end %}
 * {% for key in object %}... {{ object[key] }}... {% end %}
 */

(function() {
	'use strict';

	var tmpl = function(str) {
		var reExpression = /["'.[\]]+/g;
		var reOperator = /([=!]=|[><])=?/; // ==,===,!=,!==,>,>=,<,<=
		var reConstant = /\d+|('|")[^\1]+\1/;
		var compiled = 'var s="";';
		var addText = function(text) {
			compiled += 's+="' + text + '";';
		};
		var addE = function(s) {
			var e = s.replace(reExpression, ' ').trim().split(' ');
			compiled += 'namespace';
			while (e.length) compiled += '["' + e.shift() + '"]';
		};
		var addExpression = function(expression) {
			compiled += 's+=';
			addE(expression);
			compiled += ';';
		};
		var addIf = function(statement) {
			compiled += 'if(';
			var s = statement.slice(1);
			if (s.length === 1) {
				s = s[0].replace(reOperator, ' $& ').split(' ');
				if (s.length === 1) {
					addE(s[0]);
					compiled += '){';
					return;
				}
			}
			reConstant.test(s[0]) ? compiled += s[0] : addE(s[0]);
			compiled += s[1];
			reConstant.test(s[2]) ? compiled += s[2] : addE(s[2]);
			compiled += '){';
		};
		var addElse = function() {
			compiled += '}else{';
		};
		var addEnd = function() {
			compiled += '}';
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
					if (s !== str.length) addText(str.substring(s));
					break;
				}
				if (i > s) addText(str.substring(s, i));
				c = str.charAt(i + 1);
				if (c === '{') {
					// {{ expression }}
					j = str.indexOf('}}', i + 2);
					if (j === -1) throw new SyntaxError('}} not found');
					expression = str.substring(i + 2, j);
					addExpression(expression);
					s = j + 2;
				} else if (c === '%') {
					// {% statement %}
					j = str.indexOf('%}', i + 2);
					if (j === -1) throw new SyntaxError('%} not found');
					statement = str.substring(i + 2, j).trim();
					if (statement === 'end') {
						// {% end %}
						addEnd();
					} else if (statement === 'else') {
						// {% else %}
						addElse();
					} else {
						statement = statement.split(' ');
						if (statement[0] === 'if') {
							// {% if ... %}
							addIf(statement);
						} else if (statement[0] === 'else') {
							// {% else if ...%}
							addElseIf(statement);
						} else if (statement[0] === 'for') {
							// {% for i in l %}
							addFor(statement);
						} else {
							throw new SyntaxError('unknown keyword');
						}
					}
					s = j + 2;
				} else {
					addText(str.substring(i, i + 2));
					s = i + 2;
				}
			}
			addReturn();
		};
		parse(str);
		return new Function('namespace', compiled);
	};

	var template = function(str) {
		var execute = tmpl(str);
		console.log(execute);
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
	var et = function() {
		var oo = 'hello, world!';
		equal('hello, world!', oo);
		equal('hello, {{ world }}!', oo, {'world':'world'});
		equal('hello, {{ data[0] }}!', oo, {'data': ['world']});
		equal('hello, {{ data.world }}!', oo, {'data': {'world':'world'}});
		equal('hello, {{ data.world.w }}!', oo, {'data': {'world':{'w':'world'}}});
		equal("hello, {{ data['world'] }}!", oo, {'data': {'world':'world'}});
		equal('hello, {{ data["world"] }}!', oo, {'data': {'world':'world'}});
	};
	//et();

	// if statement test
	var ift = function() {
		var t = template('{% if a>1 %} <html> {% end %}');
		console.log(t.generate({'a':'test'}));
		t = template('{% if a %} <html> {% end %}');
		console.log(t.generate({'a':'test'}));
		t = template('{% if a==="test" %} <html> {% end %}');
		console.log(t.generate({'a':'test'}));
		t = template('{% if a!=="test" %} <html> {% end %}');
		console.log(t.generate({'a':'test'}));
		t = template('{% if a <= "test" %} <html> {% end %}');
		console.log(t.generate({'a':'test'}));
	};
	ift();
};
test();
