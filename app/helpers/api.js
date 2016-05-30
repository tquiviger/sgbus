var axios = require('axios');
var Config = require('Config');

var _apiBusArrivalsUrl = Config.apiUrl + '/api/bus_arrivals/';

var _elasticSearchBusRoutesUrl = Config.apiUrl + '/search/sgbus/bus_route/';
var _elasticSearchBusUrl = Config.apiUrl + '/search/sgbus/bus/';
var _elasticSearchBusStationsUrl = Config.apiUrl + '/search/sgbus/bus_station/';
var _elasticSearchBusRoutesSearchUrl = Config.apiUrl + '/search/sgbus/bus_route/_search';
var _elasticSearchBusStationUrl = Config.apiUrl + '/search/sgbus/bus_station/_search';
var _elasticSearchStatsUrl = Config.apiUrl + '/search/sgbus/stats/_search';


function getBusStationArrivalsInfo(bus) {
    return axios.get(_apiBusArrivalsUrl + bus)
        .then(function (currentBusStationData) {
            return currentBusStationData.data
        })
}

function getBusStationInfo(bus) {
    return axios.get(_elasticSearchBusStationsUrl + bus)
        .then(function (currentBusStationData) {
            return currentBusStationData.data
        })
}

function getBusInfo(bus) {
    return axios.get(_elasticSearchBusUrl + bus)
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

function getBusAndRoutesInfo(bus) {
    return axios.all([getBusRoutesInfo(bus), getBusInfo(bus)])
        .then(axios.spread(function (routes, bus) {
            routes.busInfo = bus._source;
            return routes
        }))
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
            getBusStation(busStationDeparture),
            getBusStationInfo(busStationArrival)
        ])
        .then(axios.spread(function (itinerary, depInfo, arrInfo) {
            itinerary.departureStation = depInfo;
            itinerary.arrivalStation = arrInfo._source;
            return itinerary
        }))
}

function getNearestBusStationInfo(lat, lon, numResults) {
    return axios.post(_elasticSearchBusStationUrl, {
            "from": 0, "size": numResults,
            "query": {
                "filtered": {
                    "filter": {
                        "geo_distance": {
                            "distance": "500m",
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

function getLatestsStats(statType) {
    return axios.post(_elasticSearchStatsUrl, {
            "query": {
                "match": {
                    "stat_type": statType
                }
            },
            "size": 1000,

            "sort": [
                {
                    "timestamp": {
                        "order": "desc"
                    }
                }
            ]
        }
    )
        .then(function (stats) {
            return stats.data
        })
}

module.exports = {
    getBusStationInfo: getBusStationInfo,
    getLatestsStats: getLatestsStats,
    getBusStation: getBusStation,
    getBusStationArrivalsInfo: getBusStationArrivalsInfo,
    getBusAndRoutesInfo: getBusAndRoutesInfo,
    getNearestBusStationInfo: getNearestBusStationInfo,
    getItineraryInfo: getItineraryInfo
};