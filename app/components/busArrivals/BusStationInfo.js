import React from 'react';
import {PropTypes} from 'react';

var BusStationArrivals = require('./BusStationArrivals');
var BusStationMap = require('./BusStationMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

var BusStationInfo = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading
                        ? <h1><img src={loadingImage} alt="Loading logo"/>
                        Loading </h1>
                        : <BusStationMap {...this.props}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <BusStationArrivals {...this.props}/>
                }
            </div>
        )
    }
});

BusStationInfo.propTypes = {
    stationData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusStationInfo;