import {fitBounds} from 'google-map-react/utils';
var _ = require('underscore');

const size = {
    width: 800, // Map width in pixels
    height: 300 // Map height in pixels
};

function getMapBounds(routes) {
    var latitudes = [];
    var longitudes = [];
    for (var i = 0; i < 110; i++) {
        var index = i < 10 ? '0' + i : i;
        if (routes['Latitude_' + index] != null  && routes['Latitude_' + index] != 0) {
            latitudes.push(routes['Latitude_' + index]);
            longitudes.push(routes['Longitude_' + index]);
        }
    }
    return getBounds(latitudes, longitudes);
}

function getMapBoundsItinerary(arrivalStations, departureStation) {
    var latitudes = arrivalStations.map(function(station){
            return station.arrivalStation.Latitude;
    })
    var longitudes = arrivalStations.map(function(station){
            return station.arrivalStation.Longitude;
    })
    latitudes.push(departureStation.Latitude);
    longitudes.push(departureStation.Longitude);
    return getBounds(latitudes, longitudes);
}


function getBounds(latitudes, longitudes){
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
    getMapBounds: getMapBounds,
    getMapBoundsItinerary:getMapBoundsItinerary
};