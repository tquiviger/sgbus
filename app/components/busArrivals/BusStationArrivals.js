import React from 'react';
import {PropTypes} from 'react';

var BusStationArrival = require('./BusStationArrival');

var styles = {
    container: {
        height: '300px',
        overflowY: 'auto',
        width: '100%'
    }
};


var BusStationArrivals = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <BusStationArrival {...this.props}
                    services={this.props.stationData.Services}
                    mode="station"/>
            </div>
        )
    }
});

BusStationArrivals.propTypes = {
    stationData: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func
};

module.exports = BusStationArrivals;