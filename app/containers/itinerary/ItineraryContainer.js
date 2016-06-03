var React = require('react');
var Itinerary = require('../../components/itinerary/Itinerary');
var getItineraryInfo = require('../../helpers/api').getItineraryInfo;
var getBusStationInfo = require('../../helpers/api').getBusStationInfo;
var getNearestBusStationInfo = require('../../helpers/api').getNearestBusStationInfo;
var _ = require('underscore');

const numResults = 6;

var ItineraryContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            arrivalStationsWithBus: [],
            routeClicked: ''
        }
    },
    callBackFunction: function (e) {
        e.preventDefault();
        var routeClicked = e.currentTarget.id;
        this.setState({
            routeClicked: routeClicked
        });
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.departureStation, this.props.routeParams.arrivalStation);
    },
    filterOnlyAvailableResultsInDepartureServices: function (busData) {
        var availableBusesId = busData.hits.hits.map(function (hit) {
            return hit._id.split('_')[0]
        });

        busData.departureStation.Services.forEach(function (service) {
            var rows = [];
            var initialDistance = 0;
            var routeDistance = 0;
            var numStops = 0;
            var busRoute = _.find(busData.hits.hits, function (hit) {
                return hit._id.split('_')[0] == service.ServiceNo
            });
            var toInsert = false;
            if (busRoute) {
                var route = busRoute._source;
                for (var i = 1; i < 110; i++) {
                    var index = (i < 10) ? '0' + i : i;

                    if (route['BusStopCode_' + index] != null) {
                        if (route['BusStopCode_' + index] == busData.departureStation.BusStopID) {
                            toInsert = true;
                            initialDistance = route['Distance_' + index];
                        }
                        if (toInsert) {
                            rows.push({
                                id: route['BusStopCode_' + index],
                                lat: route['Latitude_' + index],
                                lng: route['Longitude_' + index]
                            });
                            routeDistance = parseFloat(route['Distance_' + index]) - initialDistance;
                            numStops++;
                        }
                        if (route['BusStopCode_' + index] == busData.arrivalStation.BusStopCode) {
                            toInsert = false;
                        }
                    }
                }
            }
            service.routeDistance = routeDistance;
            service.numStops = numStops;
            service.route = rows;
        });

        busData.hits = {};
        busData.departureStation.Services = busData.departureStation.Services.filter(function (service) {
            //in the departure station Service, keeping only buses included in a route going to the arrival station
            return availableBusesId.includes(service.ServiceNo)
        })
    },
    makeRequest: function (departureStation, arrivalStation) {
        getBusStationInfo(arrivalStation)
            .then(function (arrivalStationData) {
                getNearestBusStationInfo(arrivalStationData._source.Latitude, arrivalStationData._source.Longitude, numResults)
                    .then(function (nearestArrivalStations) {
                        nearestArrivalStations.hits.hits.map(function (hit) {
                            return hit
                        }).forEach(function (arrivalSt) {
                                getItineraryInfo(departureStation, arrivalSt._id)
                                    .then(function (currentBusData) {
                                            this.filterOnlyAvailableResultsInDepartureServices(currentBusData);
                                            currentBusData.arrivalStation.distance = arrivalSt.sort[0];
                                            var newData = this.state.arrivalStationsWithBus;
                                            newData.push(currentBusData);
                                            this.setState({
                                                isLoading: false,
                                                arrivalStationsWithBus: newData
                                            });
                                        }.bind(this)
                                    )
                            }.bind(this)
                        )
                    }.bind(this))
            }.bind(this))

    },
    render: function () {
        return (
            <Itinerary
                isLoading={this.state.isLoading}
                callBackFunction={this.callBackFunction}
                routeClicked={this.state.routeClicked}
                arrivalStationsWithBus={this.state.arrivalStationsWithBus}/>
        )
    }
});

module.exports = ItineraryContainer;