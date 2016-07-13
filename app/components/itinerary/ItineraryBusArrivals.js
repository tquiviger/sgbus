import React from 'react';
import {PropTypes} from 'react';

var BusStationArrival = require('../busArrivals/BusStationArrival');

var styles = {
    container: {
        height: '300px',
        overflowY: 'auto',
        width: '100%'
    },
    title: {
        textAlign: 'left',
        marginLeft:10,
        marginTop:10
    }
};


var ItineraryBusArrivals = React.createClass({
    render: function () {
        var arrivalStationsWithBus = this.props.arrivalStationsWithBus;
        return (
            <div style={styles.container}>
                <div style={styles.title} >
                    <h4>Available buses From <b>{this.props.departureStation.Description}</b> To </h4>
                </div>
                {arrivalStationsWithBus
                    .sort(function (a, b) {
                        return parseFloat(a.arrivalStation.distance) - parseFloat(b.arrivalStation.distance)
                    }).map(function (arrivalStation, rank) {
                            return (
                                <div className="container-fluid"
                                     key={arrivalStation.arrivalStation.BusStopCode}>
                                    <BusStationArrival
                                        mode="itinerary"
                                        rank={rank}
                                        callbackFunction={this.props.callbackFunction}
                                        services={arrivalStation.services}
                                        stationData={this.props.departureStation}
                                        arrivalStation={arrivalStation.arrivalStation}/>
                                </div>
                            )
                        }.bind(this)
                    )
                }</div>)
    }
});

ItineraryBusArrivals.propTypes = {
    arrivalStationsWithBus: PropTypes.array.isRequired,
    departureStation: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func
};

module.exports = ItineraryBusArrivals;