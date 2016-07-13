import React from 'react';
import {PropTypes} from 'react';

var NearestBusStation = require('../search/NearestBusStation');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '60%',
        overflowY: 'auto',
        width: '100%'
    },
    title: {
        textAlign: 'center'
    }
};


var ItineraryNotFound = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <div style={styles.title}>
                    <h3><b>SNAP!</b></h3>
                    <h3>No itineray found from <b>{this.props.departureStation.Description}</b> To
                        <b> {this.props.originalArrivalStation._source.Description}</b> and stations around
                    </h3>
                    <h4>You might want to check an itinerary from another station</h4>
                </div>
                <NearestBusStation {...this.props}
                    mode="itineraries2"
                    text="Find other departure stations"
                    callbackFunction={this.props.callbackNotFoundFunction}
                /></div>)
    }
});

ItineraryNotFound.propTypes = {
    departureStation: PropTypes.object.isRequired,
    originalArrivalStation: PropTypes.object.isRequired,
    callbackNotFoundFunction: PropTypes.func.isRequired,
    nearestStations: PropTypes.array,
    isLoading: PropTypes.bool.isRequired
};

module.exports = ItineraryNotFound;