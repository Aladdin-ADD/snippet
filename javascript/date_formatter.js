/**
 * http://www.w3.org/TR/NOTE-datetime
 *
 * 2014-12-03 18:06:56
 *
 * YYYY = 2014
 *
 * M = 12
 * MM = 12
 *
 * D = 3
 * DD = 03
 *
 * h = 18
 * hh = 18
 *
 * m = 6
 * mm = 06
 *
 * s = 56
 * ss = 56
 *
 */

'use strict';

var pad = function(value) {
    return ('0' + value).substr(-2);
};

var dateFormatter = function(date, format) {
    // get date
    date = (typeof date === 'number') ? new Date(date) : date;

    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;
    var _date = date.getDate();
    var _hour = date.getHours();
    var _minute = date.getMinutes();
    var _second = date.getSeconds();

    // generate number
    var pairs = {
        YYYY: _year,
        M: _month,
        MM: pad(_month),
        D: _date,
        DD: pad(_date),
        h: _hour,
        hh: pad(_hour),
        m: _minute,
        mm: pad(_minute),
        s: _second,
        ss: pad(_second)
    };

    // format date
    return format.replace(/YYYY|MM?|DD?|hh?|mm?|ss?/g, function(matched) {
        return pairs[matched];
    });
};

module.exports = dateFormatter;
