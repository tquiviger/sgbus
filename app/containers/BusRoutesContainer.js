var React = require('react');
var BusStationRoutes = require('../components/busRoutes/BusStationRoutes');
var getBusRoutesInfo = require('../helpers/api').getBusRoutesInfo;

var BusRoutesContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            busData: {}
        }
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.bus);
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
    render: function () {
        return (
            <BusStationRoutes
                bus={this.props.routeParams.bus}
                isLoading={this.state.isLoading}
                busData={this.state.busData}
            />
        )
    }
});

module.exports = BusRoutesContainer;