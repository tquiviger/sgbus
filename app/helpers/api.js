var axios = require('axios');
var Config = require('Config');

var _apiBusArrivalsUrl = Config.apiUrl + '/bus_arrivals/';
var _apiBusServicesUrl = Config.apiUrl + '/bus_stations/';
var _elasticSearchBusStationUrl = Config.elasticSearchUrl + '/sgbus/bus_station/_search';
var _elasticSearchBusRoutesUrl = Config.elasticSearchUrl + '/sgbus/bus_route/';
var _elasticSearchBusRoutesSearchUrl = Config.elasticSearchUrl + '/sgbus/bus_route/_search';


function getBusStationArrivalsInfo(bus) {
    return axios.get(_apiBusArrivalsUrl + bus)
        .then(function (currentBusData) {
            return currentBusData.data
        })
}

function getBusStationInfo(bus) {
    return axios.get(_apiBusServicesUrl + bus)
        .then(function (currentBusData) {
            return currentBusData.data
        })
}

function getBusRoutesInfo(bus) {
    return axios.get(_elasticSearchBusRoutesUrl + bus)
        .then(function (currentBusData) {
            return currentBusData.data
        })
}

function getBusStation(bus) {
    return axios.all([getBusStationArrivalsInfo(bus), getBusStationInfo(bus)])
        .then(axios.spread(function (arrivals, info) {
            arrivals.stationDesc = info._source;
            arrivals.Services = arrivals.Services.sort(function (a, b) {
                return a.Status.localeCompare(b.Status) || a.ServiceNo.replace(/\D/g, '') - b.ServiceNo.replace(/\D/g, '')
            });
            return arrivals
        }))
}

function getItineraryInfo(busStationDeparture, busStationArrival) {
    return axios.all(
        [
            getBusForItinerary(busStationDeparture, busStationArrival),
            getBusStationInfo(busStationDeparture),
            getBusStationInfo(busStationArrival)
        ])
        .then(axios.spread(function (itinerary, depInfo, arrInfo) {
            itinerary.departureStation=depInfo._source;
            itinerary.arrivalStation=arrInfo._source;
            return itinerary
        }))
}

function getNearestBusStationInfo(lat, lon) {
    return axios.post(_elasticSearchBusStationUrl, {
            "from": 0, "size": 3,
            "query": {
                "filtered": {
                    "filter": {
                        "geo_distance": {
                            "distance": "1km",
                            "location": {
                                "lat": lat,
                                "lon": lon
                            }
                        }
                    }
                }
            },
            "sort": [
                {
                    "_geo_distance": {
                        "location": {
                            "lat": lat,
                            "lon": lon
                        },
                        "order": "asc",
                        "unit": "m",
                        "distance_type": "plane"
                    }
                }
            ]
        }
    )
        .then(function (currentBusData) {
            return currentBusData.data
        })
}

function getBusForItinerary(busStationDeparture, busStationArrival) {
    return axios.post(_elasticSearchBusRoutesSearchUrl, {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": busStationDeparture,
                                "type": "cross_fields",
                                "fields": ["BusStopCode*"],
                                "minimum_should_match": "50%"
                            }
                        },
                        {
                            "multi_match": {
                                "query": busStationArrival,
                                "type": "cross_fields",
                                "fields": ["BusStopCode*"],
                                "minimum_should_match": "50%"
                            }
                        }
                    ]
                }
            }
        }
    )
        .then(function (currentBusData) {
            return currentBusData.data
        })
}

module.exports = {
    getBusStation: getBusStation,
    getBusStationArrivalsInfo: getBusStationArrivalsInfo,
    getBusRoutesInfo: getBusRoutesInfo,
    getNearestBusStationInfo: getNearestBusStationInfo,
    getItineraryInfo: getItineraryInfo
};