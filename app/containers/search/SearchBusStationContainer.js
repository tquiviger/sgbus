var React = require('react');
var SearchBusStation = require('../../components/search/SearchBusStation');
var ToggleButton = require('../../components/search/ToggleButton');
var NearestBusStationContainer = require('./NearestBusStationContainer');

var SearchBusStationContainer = React.createClass({
    render: function () {
        return (
            <div>
                <SearchBusStation
                    mode={this.props.mode}
                    departureStation={this.props.departureStation}
                />
                <NearestBusStationContainer/>
            </div>
        )
    }
});

module.exports = SearchBusStationContainer;
