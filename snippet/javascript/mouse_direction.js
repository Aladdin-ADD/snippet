/*
 * + <http://www.cnblogs.com/rubylouvre/archive/2012/11/06/2757175.html>
 * + <http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction>
 *
 * usage:
 * ```javascript
 * elem.addEventListener('mouseover', function(e) {
 *     var direction = getDirection(this, e);
 *     console.log(direction);
 * }, false);
 * ```
 */

(function() {
    'use strict';

    this.getDirection = function(elem, event) {
        var pos = elem.getBoundingClientRect();
        var nx = 1;
        var ny = 1;
        if (pos.width > pos.height) {
            nx = pos.height / pos.width;
        } else {
            ny = pos.width / pos.height;
        }
        var x = (event.clientX - pos.left - pos.width / 2) * nx;
        var y = (event.clientY - pos.top - pos.height / 2) * ny;
        var degree = Math.atan2(y, x) * 180 / Math.PI;
        var direction = 0;
        if (degree > 135) direction = 3;
        else if (degree > 45) direction = 2;
        else if (degree > -45) direction = 1;
        else if (degree > -135) direction = 0;
        else direction = 3;
        return direction;
    };
}).call(window);
