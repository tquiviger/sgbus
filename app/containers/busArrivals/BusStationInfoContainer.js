import React from 'react';

var BusStationInfo = require('../../components/busArrivals/BusStationInfo');
var getBusStation = require('../../helpers/api').getBusStation;

var myInterval;

var BusStationInfoContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            stationData: {}
        }
    },
    componentDidMount: function () {
        this.makeRequest();
        myInterval = setInterval(this.makeRequest, 5000)
    },
    componentWillUnmount: function () {
        clearInterval(myInterval);
    },
    makeRequest: function () {
        getBusStation(this.props.routeParams.busStation)
            .then(function (stationData) {
                this.setState({
                    isLoading: false,
                    stationData: stationData
                });
            }.bind(this));
    },
    updateData: function () {
        var stationData = this.state.stationData;
        this.setState({
            stationData: stationData
        });
    },
    render: function () {
        return (
            <BusStationInfo {...this.state}/>
        )
    }
});

module.exports = BusStationInfoContainer;