var React = require('react');
var BusStation = require('../components/busArrivals/BusStation');
var getBusStation = require('../helpers/api').getBusStation;

var BusStationInfoContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isLoading: true,
            stationData: {}
        }
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.busStation);
        myInterval = setInterval(this.updateData, 5000)
    },
    componentWillUnmount: function () {
        clearInterval(myInterval);
    },
    makeRequest: function (busStation) {
        getBusStation(busStation)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    stationData: stationData
                });
            }.bind(this));
    },
    updateData: function () {
        stationData = this.state.stationData
        this.setState({
            stationData: stationData
        });
    },
    render: function () {
        return (
            <BusStation
                busStation={this.props.routeParams.busStation}
                isLoading={this.state.isLoading}
                stationData={this.state.stationData}
            />
        )
    }
});

module.exports = BusStationInfoContainer;