var React = require('react');
var SearchBusStation = require('../../components/search/SearchBusStation');
var NearestBusStationContainer = require('./NearestBusStationContainer');

var SearchBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            departureStation: {},
            arrivalStation: {},
            buttonCallback: this.updateDepartureStation
        }
    },
    updateDepartureStation: function () {
        this.setState({
            departureStation: {id: 1, name: "La station"},
            buttonCallback: this.updateArrivalStation()
        });
    },
    updateArrivalStation: function () {
        this.setState({
            departureStation: {id: 2, name: "L'autre station"}
        });
    },
    render: function () {
        return (
            <div>
                <SearchBusStation
                    buttonCallback={this.state.buttonCallback}
                    departureStation={this.state.departureStation}
                    arrivalStation={this.state.arrivalStation}
                />
                <NearestBusStationContainer/>
            </div>
        )
    }
});

module.exports = SearchBusStationContainer;
