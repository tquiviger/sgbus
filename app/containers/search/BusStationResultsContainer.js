var React = require('react');
var BusStationResults = require('../../components/search/BusStationResults');
var withRouter = require('react-router').withRouter;

var BusStationResultsContainer = React.createClass({
    getInitialState: function () {
        return {
            onSubmitBusStation: this.handleSubmitBusStation
        }
    },
    handleSubmitBusStation: function (e) {
        e.preventDefault();
        var stationClicked = e.currentTarget.id;
        this.props.router.push('/detail/' + stationClicked);
    },
    render: function () {
        return (
            <BusStationResults
                onSubmitBusStation={this.state.onSubmitBusStation}
                busStations={this.props}
            />
        )
    }
});

module.exports = withRouter(BusStationResultsContainer);
