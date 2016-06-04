var React = require('react');
var NearestBusStation = require('../../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../../helpers/api').getNearestBusStationInfo;
var withRouter = require('react-router').withRouter;

const numResults = 3;

var NearestBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            nearestStations: [],
            callbackFunction: this.onSubmitNearestBusStation
        }
    },
    locationSuccess: function (position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude, numResults)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    nearestStations: stationData.hits.hits
                })
            }.bind(this));
    },
    onSubmitNearestBusStation: function (e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess);
        }
        else {
            this.setState({
                isLoading: false
            });
        }
    },
    render: function () {
        return (
            <NearestBusStation {...this.state}
                mode={this.props.mode}
            />
        )
    }
});

module.exports = withRouter(NearestBusStationContainer);
