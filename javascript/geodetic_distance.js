'use strict';

// haversine formula
var DIAM = 6378137 * 2;
var _radians = Math.PI / 180;
var haversine = function(lat1, lon1, lat2, lon2) {
    var lat1r = lat1 * _radians;
    var lon1r = lon1 * _radians;
    var lat2r = lat2 * _radians;
    var lon2r = lon2 * _radians;

    var latDelta = lat2r - lat1r;
    var lonDelta = lon2r - lon1r;
    var a = Math.pow(Math.sin(latDelta / 2), 2) + Math.pow(Math.sin(lonDelta / 2), 2) * Math.cos(lat1r) * Math.cos(lat2r);
    var distance = Math.asin(Math.sqrt(a)) * DIAM;
    return distance;
};

module.exports = haversine;
