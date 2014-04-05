(function() {
    "use strict";

    var win = (0, eval)("this");
    var Class = win.Class = function() {};

    Class.extend = function extendClass(props) {
        // constructor of subclass
        var _constructor = function Class() {
            // if `init` method existed, apply to new object
            // this pointer to new instance
            if (typeof(this.init) == "function")
                this.init.apply(this, arguments);
        };

        // add `extend` method to constructor
        _constructor.extend = extendClass;

        // prototype of subclass
        // this pointer to superclass
        // _prototype.__proto__ === superclass.prototype
        // _prototype.superclass === superclass.prototype
        var _prototype = Object.create(this.prototype);
        _prototype.superclass = this.prototype;
        _prototype.constructor = _constructor; // useless?

        // copy props to prototype, include `init`
        // **caution**:
        // objects defined in props will be shared among instances.
        // objects defined in `init` method will be created for every instance.
        for (var name in props) {
            _prototype[name] = props[name];
        }

        // assign prototype
        _constructor.prototype = _prototype;

        return _constructor;
    };
})();


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
    })();

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
    })();
}
