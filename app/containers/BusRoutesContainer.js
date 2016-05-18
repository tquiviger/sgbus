var React = require('react');
var BusInfo = require('../components/busRoutes/BusInfo');
var getBusRoutesInfo = require('../helpers/api').getBusRoutesInfo;

var BusRoutesContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            busData: {},
            currentStation: '',
            onHoverStation: this.onHoverStation
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
    onHoverStation: function (e) {
        e.preventDefault();
        var stationClicked = e.currentTarget.id
        this.setState({
            currentStation: stationClicked
        });
    },
    render: function () {
        return (
            <BusInfo
                bus={this.props.routeParams.bus}
                isLoading={this.state.isLoading}
                busData={this.state.busData}
                currentStation={this.state.currentStation}
                onHoverStation={this.state.onHoverStation}
            />
        )
    }
});

module.exports = BusRoutesContainer;