var React = require('react');
var Itinerary = require('../../components/itinerary/Itinerary');
var getBusForItinerary = require('../../helpers/api').getBusForItinerary;

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
    makeRequest: function (departureStation, arrivalStation) {
        getBusForItinerary(departureStation, arrivalStation)
            .then(function (busData) {
                this.setState({
                    isLoading: false,
                    busData: busData.hits.hits
                });
            }.bind(this));
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