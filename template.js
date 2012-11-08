/*
 * Usage:
 * var t = template('{{ ns.key }}');
 * var outpot = t.generate({'key': 'value');
 *
 * Syntax:
 * {{ expr }}
 * {% if (...) %}... {% else if (...) %}... {% else %}... {% end %}
 * {% for (...;...;...) %}... {% end %}
 */

(function() {
	'use strict';
	var compile = function(str) {
		var compiled = '"use strict";var o="';
		compiled += str.replace(/\s+/g, ' ')
			.replace(/{{\s?/g, '"+')
			.replace(/\s?}}/g, '+"')
			.replace(/{%\s?else/g, '";}else')
			.replace(/{%\s?end\s?%}/g, '";}o+="')
			.replace(/{%/g, '";')
			.replace(/%}/g, '{o+="')
		compiled += '";return o;';
		console.log(compiled);
		return compiled;
	};
	
	this.template = function(str) {
		return {'generate': new Function('ns', compile(str))};
	};
}).call(window);

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
		equal('hello, {{ ns.world }}!', oo, {'world':'world'});
		equal('hello, {{ ns.data[0] }}!', oo, {'data': ['world']});
		equal('hello, {{ ns.data.world }}!', oo, {'data': {'world':'world'}});
		equal('hello, {{ ns.data.world.w }}!', oo, {'data': {'world':{'w':'world'}}});
		equal("hello, {{ ns.data['world'] }}!", oo, {'data': {'world':'world'}});
		equal('hello, {{ ns.data["world"] }}!', oo, {'data': {'world':'world'}});
	};

	// if statement test
	var ift = function() {
		var ii = '{%   if (  ns.s   ==1) %}one' +
			'{% else if  ( ns.s===2) %}two' +
			'{% else   if( ns.s ==3)%}three' +
			'{%   else if (ns.s== 4)%}four' +
			'{%   else   if (ns.s<6 )  %}five' +
			'{%   else   if( ns.s<=6)   %}six' +
			'{% else if (ns.s<= 7) %}seven' +
			'{% else if (ns.s !== 9) %}eight' +
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
	
	// for loop test
	var ft = function() {
		var ii = '{% for (var i=0,l=ns.l.length;i<l;i++) %}' +
			'<li>{{ ns.l[i] }}</li>' +
			'{% end %}';
		equal(ii, '<li>1</li><li>2</li>', {'l':[1,2]});
	};
	
	
	//et();
	//ift();
	ft();
};
test();
