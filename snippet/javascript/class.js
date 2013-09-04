(function(win) {
	"use strict";

	var Class = win.Class = function() {};

	// make Class.extend readonly
	Object.defineProperty(Class, "extend", {
		value: function extendClass(props) {
			// prototype of subclass
			// _prototype.__proto__ === superclass.prototype
			var _prototype = Object.create(this.prototype);

			// copy props to prototype
			// **caution**:
			// objects defined in properties will be shared between instances.
			// objects defined in `init` method will be created for each instance.
			for (var name in props) {
				_prototype[name] = props[name];
			}
			// assign superclass
			_prototype.superclass = this.prototype;

			// constructor of subclass
			var _constructor = function Class() {
				// if `init` method existed, apply to new object
				if (typeof(this.init) == "function")
					this.init.apply(this, arguments);
			};

			// assign prototype, for `instanceof`
			_constructor.prototype = _prototype;

			// override constructor (useless?)
			_prototype.constructor = _constructor;

			// add extend method to constructor
			_constructor.extend = extendClass;

			return _constructor;
		}
	});
}(this));


function example() {
	"use strict";

	// handwrite
	var catA = (function() {
		function Animal(name) {
			this.name = name;
		}
		Animal.prototype.getName = function() {
			return this.name;
		};

		function Cat(name, age) {
			Animal.call(this, name);
			this.age = age;
		}
		Cat.prototype = new Animal();
		Cat.prototype.constructor = Cat;
		Cat.prototype.type = "cat";

		return new Cat("kate", 2);
	}());

	// use Class
	// `extend`, `init`, `superclass` are useful
	var catB = (function() {
		var Animal = Class.extend({
			init: function(name) {
				this.name = name;
			},
			getName: function() {
				return this.name;
			}
		});

		var Cat = Animal.extend({
			init: function(name, age) {
				this.superclass.init(name);
				this.age = age;
			},
			type: "cat"
		});

		return new Cat("kate", 2);
	}());
}
