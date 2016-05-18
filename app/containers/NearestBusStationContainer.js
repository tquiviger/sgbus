var React = require('react');
var NearestBusStation = require('../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../helpers/api').getNearestBusStationInfo;
var withRouter = require('react-router').withRouter;

var GetNearestBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            nearestStations: [],
            buttonCallback: this.searchNearestBusStation
        }
    },
    locationSuccess: function (position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    nearestStations: stationData.hits.hits
                })
            }.bind(this));
    },
    searchNearestBusStation: function (e) {
        e.preventDefault();
        this.setState({
            isLoading:true
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess);
        }
        else {
            this.setState({
                isLoading:false
            });
        }
    },
    render: function () {
        return (
            <NearestBusStation
                onSubmitNearestBusStation={this.state.buttonCallback}
                isLoading={this.state.isLoading}
                nearestStations={this.state.nearestStations}
            />
        )
    }
});

module.exports = withRouter(GetNearestBusStationContainer);
