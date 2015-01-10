// https://github.com/Raynos/xtend/blob/master/immutable.js

function extend() {
    var target = {};

    for (var i = 0, ii = arguments.length; i < ii; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}
