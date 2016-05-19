var React = require('react');
var BusInfo = require('../../components/busRoutes/BusInfo');
var getBusRoutesInfo = require('../../helpers/api').getBusRoutesInfo;

var ItineraryContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            busData: {},
            currentStation: '',
            onHoverStation: this.onHoverStation
        }
    },
    componentDidMount: function () {
        // this.makeRequest(this.props.routeParams.bus);
    },
    makeRequest: function (bus) {
        getBusRoutesInfo(bus)
            .then(function (busData) {
                this.setState({
                    isLoading: false,
                    busData: busData
                });
            }.bind(this));
    },
    updateData: function () {
        var busData = this.state.busData;
        this.setState({
            busData: busData
        });
    },
    onHoverStation: function (e) {
        e.preventDefault();
        var stationClicked = e.currentTarget.id;
        this.setState({
            currentStation: stationClicked
        });
    },
    render: function () {
        return (
            <h1>{this.props.routeParams.departureStation} - {this.props.routeParams.arrivalStation}</h1>
        )
    }
});

module.exports = ItineraryContainer;