var React = require('react');
var NearestBusStation = require('../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../helpers/api').getNearestBusStationInfo;
var withRouter = require('react-router').withRouter;

const defaultFindText = 'Find the nearest stations';
const defaultNotFoundText = 'No Station found';

var GetNearestBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            buttonText: defaultFindText,
            nearestStations: [],
            buttonCallback: this.searchNearestBusStation
        }
    },
    locationSuccess: function (position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude)
            .then(function (stationData) {
                this.setState({
                    buttonText: defaultFindText,
                    nearestStations: stationData.hits.hits
                })
            }.bind(this));
    },
    locationError: function () {

        this.setState({
            buttonText: defaultNotFoundText
        });
    },
    searchNearestBusStation: function (e) {
        e.preventDefault();
        this.setState({
            buttonText: defaultNotFoundText
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
        else {
            this.setState({
                buttonText: 'No Station found'
            });
        }
    },
    render: function () {
        return (
            <NearestBusStation
                onSubmitNearestBusStation={this.state.buttonCallback}
                buttonText={this.state.buttonText}
                nearestStations={this.state.nearestStations}
            />
        )
    }
});

module.exports = withRouter(GetNearestBusStationContainer);
