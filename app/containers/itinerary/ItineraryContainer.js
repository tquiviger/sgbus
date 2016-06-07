var React = require('react');
var ItineraryInfo = require('../../components/itinerary/ItineraryInfo');
var getItineraryInfo = require('../../helpers/api').getItineraryInfo;
var getBusStationInfo = require('../../helpers/api').getBusStationInfo;
var getNearestBusStationInfo = require('../../helpers/api').getNearestBusStationInfo;
var _ = require('underscore');

const numItineraryResults = 6;
const numDepartureStationsAround = 4;

var ItineraryContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            arrivalStationsWithBus: [],
            routeClicked: '',
            departureStation: {},
            callbackFunction: this.callbackFunction,
            callbackNotFoundFunction: this.noItineraryFound,
            nearestStations: [],
            originalArrivalStation: {},
            departureId: 0,
            numItineraryResults:numItineraryResults
        }
    },
    callbackFunction: function (e) {
        e.preventDefault();
        var routeClicked = e.currentTarget.id;
        this.setState({
            routeClicked: routeClicked
        });
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.departureStation, this.props.routeParams.arrivalStation);
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.departureId != nextProps.routeParams.departureStation) {
            this.makeRequest(nextProps.routeParams.departureStation, nextProps.routeParams.arrivalStation);
        }
        this.setState({
            departureId: nextProps.routeParams.departureStation
        });
    },
    filterOnlyAvailableResultsInDepartureServices: function (busData) {
        var availableBusesId = busData.hits.hits.map(function (hit) {
            return hit._id.split('_')[0]
        });

        var services = busData.departureStation.Services;
        services.forEach(function (service) {
            var routeStations = [];
            var busRoute = _.find(busData.hits.hits, function (hit) {
                return hit._id.split('_')[0] == service.ServiceNo
            });
            if (busRoute) {
                var route = busRoute._source;
                var invertedRoute = _.invert(route);
                var depIndex = invertedRoute[busData.departureStation.BusStopID].split('_')[1];
                var arrIndex = invertedRoute[busData.arrivalStation.BusStopCode].split('_')[1];
                var numStops = arrIndex - depIndex;
                var routeDistance = Math.round(Number(
                        (parseFloat(route['Distance_' + arrIndex]) - parseFloat(route['Distance_' + depIndex]))
                        * 100))
                    / 100;
                for (var i = Number(depIndex); i < Number(arrIndex); i++) {
                    var index = (i < 10) ? '0' + i : i;
                    routeStations.push({
                        id: route['BusStopCode_' + index],
                        lat: route['Latitude_' + index],
                        lng: route['Longitude_' + index]
                    });
                }
                service.routeDistance = routeDistance;
                service.numStops = numStops;
                service.route = routeStations;
                service.goingInCorrectDirection = depIndex < arrIndex;
            }

        });

        return services.filter(function (service) {
            //in the departure station Service, keeping only buses included in a route going to the arrival station
            return availableBusesId.includes(service.ServiceNo) && service.goingInCorrectDirection
        });
    },
    makeRequest: function (departureStation, arrivalStation) {
        this.setState({
            isLoading: true,
            arrivalStationsWithBus: []
        });
        getBusStationInfo(arrivalStation)
            .then(function (arrivalStationData) {
                getNearestBusStationInfo(arrivalStationData._source.Latitude, arrivalStationData._source.Longitude, numItineraryResults)
                    .then(function (nearestArrivalStations) {
                        nearestArrivalStations.hits.hits.map(function (hit) {
                            return hit
                        }).forEach(function (arrivalSt) {
                                getItineraryInfo(departureStation, arrivalSt._id)
                                    .then(function (currentBusData) {
                                            currentBusData.arrivalStation.distance = arrivalSt.sort[0];
                                            arrivalStation = {
                                                distance: arrivalSt.sort[0],
                                                services: this.filterOnlyAvailableResultsInDepartureServices(currentBusData),
                                                arrivalStation: currentBusData.arrivalStation
                                            };
                                            var stateData = this.state.arrivalStationsWithBus;
                                            stateData.push(arrivalStation);
                                            this.setState({
                                                isLoading: false,
                                                departureStation: currentBusData.departureStation.stationDesc,
                                                arrivalStationsWithBus: stateData,
                                                originalArrivalStation: arrivalStationData
                                            });
                                        }.bind(this)
                                    )
                            }.bind(this)
                        )
                    }.bind(this))
            }.bind(this))

    },
    noItineraryFound: function () {
        this.setState({
            isLoading: true
        });
        getNearestBusStationInfo(this.state.departureStation.Latitude, this.state.departureStation.Longitude, numDepartureStationsAround, this.state.departureStation.BusStopCode)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    nearestStations: stationData.hits.hits
                })
            }.bind(this));
    },
    render: function () {
        return (
            <ItineraryInfo {...this.state}/>
        )
    }
});

module.exports = ItineraryContainer;