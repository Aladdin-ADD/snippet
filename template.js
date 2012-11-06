/*
 * Usage:
 * var t = template("template string");
 * var outpot = t.generate("json data");
 *
 * Syntax:
 * {{ expression }}
 * NOTE: if statement only support `comparison operators` now.
 * {% if expression %}... {% else if expression %}... {% else %}... {% end %}
 * {% for index in list %}... {{ list[index] }}... {% end %}
 * {% for key in object %}... {{ object[key] }}... {% end %}
 */

(function() {
	'use strict';

	var compile = function(str) {
		var reExpression = /["'.[\]]+/g;
		var reOperator = /([=!]=|[><])=?/; // ==,===,!=,!==,>,>=,<,<=
		var reConstant = /\d+|('|")[^\1]+\1|([=!]=|[><])=?/;
		var reSpace = /\s+/g;
		var reStatement = /^\s*(if|else if|for)\s+/i;
		
		var compiled = 'var s="";';
		var addText = function(text) {
			compiled += 's+="' + text + '";';
		};
		var parseExpression = function(s) {
			var e = s.replace(reExpression, ' ').trim().split(' ');
			var ret = 'namespace';
			while (e.length) ret += '["' + e.shift() + '"]';
			return ret;
		};
		var addExpression = function(e) {
			compiled += 's+=' + parseExpression(e) + ';';
		};
		var addIf = function(s, e) {
			s = s.replace(reSpace, '').replace(reOperator, ' $& ').split(' ');
			if (s.length === 1) {
				compiled += 'if(' + parseExpression(s[0]) + '){';
				return;
			}
			for(var i = 0, l = s.length; i<l; i++) {
				s[i] = reConstant.test(s[i]) ? s[i] : parseExpression(s[i]);
			}
			compiled += (e ? '}else if(' : 'if(') + s.join('') + '){';
		};
		var addElse = function() {
			compiled += '}else{';
		};
		var addFor = function(s) {
			s = s.split(reSpace);
		};
		var addEnd = function() {
			compiled += '}';
		};
		var addReturn = function() {
			compiled += 'return s;';
		};
		var parse = function(str, start) {
			// 用于确定循环
			var len = str.length, s = start || 0, i = 0, j = 0, c = undefined;
			// 用于获取表达式
			var expression = undefined;
			// 用于判断语句类型
			var statement = undefined, keyword = undefined;
			while (s < len) {
				i = str.indexOf('{', s);
				if (i === -1) {
					addText(str.substring(s));
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
						statement = statement.replace(reSpace, ' ');
						keyword = reStatement.exec(statement)[1];
						statement = statement.replace(keyword, '');
						if (keyword === 'if') {
							addIf(statement);
						} else if (keyword === 'else if') {
							addIf(statement, true);
						} else if (keyword === 'for') {
							addFor(statement);
						} else {
							throw new SyntaxError(keyword + ': unknown');
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
		//console.log(compiled);
		return compiled;
	};
	
	var template = function(str) {
		return {'generate': new Function('namespace', compile(str))};
	};

	window.template = template;
})();


var test = function() {
	function equal(input, output, data) {
		var o = template(input).generate(data || {});
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

	// if statement test
	var ift = function() {
		var ii = '{%   if   s   ==1 %}one' +
			'{% else if   s===2 %}two' +
			'{% else   if s ==3%}three' +
			'{%   else if s== 4%}four' +
			'{%   else   if s<6   %}five' +
			'{%   else   if s<=6   %}six' +
			'{% else if s<= 7 %}seven' +
			'{% else if s !== 9 %}eight' +
			'{% else %}nine{%end%}';
		equal(ii, 'one', {'s': 1});
		equal(ii, 'two', {'s': 2});
		equal(ii, 'three', {'s': 3});
		equal(ii, 'four', {'s': 4});
		equal(ii, 'five', {'s': 5});
		equal(ii, 'six', {'s': 6});
		equal(ii, 'seven', {'s': 7});
		equal(ii, 'eight', {'s': 8});
		equal(ii, 'nine', {'s': 9});
	};
	
	
	et();
	ift();
};
test();
