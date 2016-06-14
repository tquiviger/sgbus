import {fitBounds} from 'google-map-react/utils';
var _ = require('underscore');

const size = {
    width: 800, // Map width in pixels
    height: 300 // Map height in pixels
};

function getMapBounds(busData) {
    var routes = busData.routes_1;
    var latitudes = [];
    var longitudes = [];
    for (var i = 0; i < 110; i++) {
        var index = i < 10 ? '0' + i : i;
        if (routes['Latitude_' + index] != null  && routes['Latitude_' + index] != 0) {
            latitudes.push(routes['Latitude_' + index]);
            longitudes.push(routes['Longitude_' + index]);
        }
    }
    var nw = {
            lat: _.max(latitudes),
            lng: _.min(longitudes)
        },
        se = {
            lat: _.min(latitudes),
            lng: _.max(longitudes)

        };

    return fitBounds({nw, se}, size);
}


module.exports = {
    getMapBounds: getMapBounds
};