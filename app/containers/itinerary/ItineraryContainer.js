var React = require('react');
var Itinerary = require('../../components/itinerary/Itinerary');
var getItineraryInfo = require('../../helpers/api').getItineraryInfo;
var getBusStationInfo = require('../../helpers/api').getBusStationInfo;
var getNearestBusStationInfo = require('../../helpers/api').getNearestBusStationInfo;

const numResults = 6;

var ItineraryContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            busData: []
        }
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.departureStation, this.props.routeParams.arrivalStation);
    },
    filterOnlyAvailableResultsInDepartureServices: function (busData) {
        var availableBuses = busData.hits.hits.map(function (hit) {
            return hit._id
        });
        return busData.departureStation.Services.filter(function (service) {
            return availableBuses.includes(service.ServiceNo)
        });
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
                                            currentBusData.departureStation.Services = this.filterOnlyAvailableResultsInDepartureServices(currentBusData);
                                            currentBusData.arrivalStation.distance = arrivalSt.sort[0];
                                            var newData = this.state.busData;
                                            newData.push(currentBusData);
                                            this.setState({
                                                isLoading: false,
                                                busData: newData
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
                buses={this.state.busData}/>
        )
    }
});

module.exports = ItineraryContainer;