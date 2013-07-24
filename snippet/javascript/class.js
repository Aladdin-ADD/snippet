// there are three special property:
// constructor's `extend`,
// instance's `init` and `_super`.
//
//
// usage:
// var Animal = Class.extend({
//	init: function(name) {
//		this.name = name;
//	}
// });
// var Cat = Animal.extend({
//	init: function(name) {
//		this._super(name);
//		this.type = 'cat';
//	}
// });
// var cat = new Cat('cake');
// console.log(cat);


(function() {
	'use strict';

	// Class will be used as constructor
	var Class = function() {};

	Class.extend = function extend(properties) {
		// instance of superclass
		// prototype of subclass
		var _prototype = new this();

		// copy properties to prototype
		// **caution**:
		// define immutable objects in properties,
		// which will be shared between instances.
		// define mutable objects in `init` method,
		// which will be created for each instance.
		var _super = this.prototype;
		for (var name in properties) {
			if (typeof(properties[name]) === 'function' &&
				typeof(_super[name]) === 'function' &&
				/\b_super\b/.test(properties[name])) {
				// if property is a function
				// and `_super` method is invoked
				// get `_super` from prototype
				_prototype[name] = (function(name, fn) {
					return function() {
						// assign super method to `_super` temporary
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						delete this._super;
						return ret;
					};
				})(name, properties[name]);
			} else {
				// other properties
				_prototype[name] = properties[name];
			}
		}

		// constructor of subclass
		var _constructor = function Class() {
			// if `init` method existed, apply to new object
			if (this.init)
				this.init.apply(this, arguments);
		};

		// override constructor
		_prototype.constructor = _constructor;
		// assign prototype, make `instanceof` work
		_constructor.prototype = _prototype;

		// add extend method to constructor
		_constructor.extend = extend;

		return _constructor;
	};

	window.Class = Class;
})();
