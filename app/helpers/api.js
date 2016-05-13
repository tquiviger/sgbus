var axios = require('axios');
var Config = require('Config')

var _apiBusArrivalsUrl = Config.apiUrl + '/bus_arrivals/';
var _apiBusServicesUrl = Config.apiUrl + '/bus_stations/';


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

function getBusStation(bus) {

    return axios.all([getBusStationArrivalsInfo(bus), getBusStationInfo(bus)])
        .then(axios.spread(function (arrivals, info) {
            arrivals.stationDesc = info._source
            return arrivals
        }))
    
}

module.exports = {
    getBusStationArrivalsInfo: getBusStationArrivalsInfo,
    getBusStation:getBusStation
};