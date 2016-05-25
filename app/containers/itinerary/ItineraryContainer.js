var React = require('react');
var Itinerary = require('../../components/itinerary/Itinerary');
var getItineraryInfo = require('../../helpers/api').getItineraryInfo;

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
        var busToLookForItinerary = [arrivalStation, '06011'];
        busToLookForItinerary.forEach(function (arrivalSt) {
                getItineraryInfo(departureStation, arrivalSt)
                    .then(function (currentBusData) {
                            currentBusData.departureStation.Services = this.filterOnlyAvailableResultsInDepartureServices(currentBusData);
                            var newData = this.state.busData
                            newData.push(currentBusData)
                            this.setState({
                                isLoading: false,
                                busData: newData
                            })
                        }.bind(this)
                    )
            }.bind(this)
        )

    },
    updateData: function () {
        var busData = this.state.busData;
        this.setState({
            busData: busData
        });
    },
    render: function () {
        return (
            <Itinerary
                isLoading={this.state.isLoading}
                buses={this.state.busData}

            />
        )
    }
});

module.exports = ItineraryContainer;