var React = require('react');
var NearestBusStation = require('../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../helpers/api').getNearestBusStationInfo;
var withRouter = require('react-router').withRouter;

var GetNearestBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            nearestStationName: 'Find the nearest station',
            nearestStationId:'',
            buttonCallback: this.searchNearestBusStation
        }
    },
    locationSuccess: function (position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude)
            .then(function (stationData) {
                this.setState({
                    nearestStationName: this.getStationNameAndDistance(stationData),
                    nearestStationId:stationData.hits.hits[0]._id,
                    buttonCallback: function (e) {
                        e.preventDefault();
                        this.props.router.push('/detail/' + e.currentTarget.getAttribute('value'))
                    }.bind(this)
                })
            }.bind(this));
    },
    locationError: function () {
        this.setState({
            nearestStationName: 'No Station found'
        });
    },
    searchNearestBusStation: function (e) {
        e.preventDefault();
        this.setState({
            nearestStationName: 'loading'
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
        else {
            this.setState({
                nearestStationName: 'No Station found'
            });
        }
    },
    getStationNameAndDistance: function (stationData) {
        return stationData.hits.hits[0]._source.Description
            + ' ('
            + Math.round(Number(stationData.hits.hits[0].sort[0]))
            + ' meters)'
    },
    render: function () {
        return (
            <NearestBusStation
                onSubmitNearestBusStation={this.state.buttonCallback}
                nearestStationName={this.state.nearestStationName}
                nearestStationId={this.state.nearestStationId}
            />
        )
    }
});

module.exports = withRouter(GetNearestBusStationContainer);
