import React from 'react';
var NearestBusStation = require('../../components/search/NearestBusStation');
var getNearestBusStationInfo = require('../../helpers/api').getNearestBusStationInfo;
import {withRouter} from 'react-router';

const numResults = 3;

var NearestBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
            nearestStations: [],
            callbackFunction: this.onSubmitNearestBusStation,
            userCoord: {}
        }
    },
    componentWillReceiveProps : function () {
        this.setState({
            nearestStations: []
        })
    },
    locationSuccess: function (position) {
        getNearestBusStationInfo(position.coords.latitude, position.coords.longitude, numResults)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    nearestStations: stationData.hits.hits,
                    userCoord: {lat: position.coords.latitude, lng: position.coords.longitude}
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
                {...this.props}
            />
        )
    }
});

module.exports = withRouter(NearestBusStationContainer);
