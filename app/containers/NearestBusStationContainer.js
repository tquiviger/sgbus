var React = require('react');
var PropTypes = React.PropTypes;
var GetBusStation = require('../components/search/GetBusStation');
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
    useGeoData: function(position) {
        getNearestBusStationInfo(position.coords.latitude,position.coords.longitude)
            .then(function (stationData) {
                this.setState({
                    nearestStationName: stationData.hits.hits[0]._source.Description,
                    buttonCallback: function(e) {
                        e.preventDefault()
                        this.context.router.push('/detail/' + stationData.hits.hits[0]._id)
                    }.bind(this)
                 })
             }.bind(this));
    },
    toto: function(position) {
        this.setState({
            nearestStationName:'No Station found'
        });
    },
    searchNearestBusStation: function(e) {
        e.preventDefault()
        this.setState({
            nearestStationName:'Loading'
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.useGeoData, this.toto);
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