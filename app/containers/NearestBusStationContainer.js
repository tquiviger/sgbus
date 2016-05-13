var React = require('react');
var PropTypes = React.PropTypes;
var NearestBusStation = require('../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../helpers/api').getNearestBusStationInfo;

var GetNearestBusStationContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            nearestStationName: 'Find the nearest station',
            buttonCallback: this.searchNearestBusStation
        }
    },
    locationSuccess: function(position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude)
            .then(function (stationData) {
                this.setState({
                    nearestStationName: this.getStationNameAndDistance(stationData),
                    buttonCallback: function(e) {
                        e.preventDefault()
                        this.context.router.push('/detail/' + stationData.hits.hits[0]._id)
                    }.bind(this)
                 })
             }.bind(this));
    },
    locationError: function(position) {
        this.setState({
            nearestStationName:'No Station found'
        });
    },
    searchNearestBusStation: function(e) {
        e.preventDefault()
        this.setState({
            nearestStationName:'loading'
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
        else {
            this.setState({
                nearestStationName:'No Station found'
            });
        }
    },
    getNearestStationInfo: function (stationId) {
        this.context.router.push('/detail/' + stationId)

    },
    getStationNameAndDistance: function(stationData){
        return stationData.hits.hits[0]._source.Description
        + ' ('
        + Math.round(Number(stationData.hits.hits[0].sort[0]))
        + ' meters)'
    },
    render: function() {
        return (
        <NearestBusStation
            onSubmitNearestBusStation = {this.state.buttonCallback}
            nearestStationName = {this.state.nearestStationName}
            />
        )
    }
});

module.exports = GetNearestBusStationContainer;