var axios = require('axios');
var Config = require('Config')

var _apiBusArrivalsUrl = Config.apiUrl + '/bus_arrivals/';
var _apiBusServicesUrl = Config.apiUrl + '/bus_stations/';
var _elasticSearchBusStationUrl = Config.elasticSearchUrl + '/sgbus/bus_station/_search';


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

function getNearestBusStationInfo(lat,lon) {

    return axios.post(_elasticSearchBusStationUrl,{
            "from" : 0, "size" : 1,
              "query": {
                "filtered": {
                  "filter": {
                    "geo_distance": {
                      "distance": "1km",
                      "location": {
                        "lat":  lat,
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
                    "lat":  lat,
                    "lon": lon
                    },
                    "order":         "asc",
                    "unit":          "m",
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

function getBusStation(bus) {

    return axios.all([getBusStationArrivalsInfo(bus), getBusStationInfo(bus)])
        .then(axios.spread(function (arrivals, info) {
            arrivals.stationDesc = info._source
            arrivals.Services = arrivals.Services.sort(function(a, b){
            return a.Status.localeCompare(b.Status) || a.ServiceNo.replace(/\D/g,'')-b.ServiceNo.replace(/\D/g,'')
            });
            return arrivals
        }))
    
}

module.exports = {
    getBusStationArrivalsInfo: getBusStationArrivalsInfo,
    getBusStation: getBusStation,
    getNearestBusStationInfo: getNearestBusStationInfo
};