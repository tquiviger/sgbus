import React from 'react';
import {PropTypes} from 'react';

var BusRoutes = require('./BusRoutes');
var BusRoutesMap = require('./BusRoutesMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

var BusInfo = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading === true
                        ? <h1><img src={loadingImage} alt="Loading logo"/>Loading
                    </h1>
                        : <BusRoutesMap
                        busData={this.props.busData}
                        currentDirection={this.props.currentDirection}
                        currentStation={this.props.currentStation}
                        currentStationLat={this.props.currentStationLat}
                        currentStationLon={this.props.currentStationLon}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <BusRoutes {...this.props}/>
                }
            </div>
        )
    }
});

BusInfo.propTypes = {
    busData: PropTypes.object.isRequired,
    onHoverStation: PropTypes.func.isRequired,
    callbackFunction: PropTypes.func.isRequired,
    currentStation: PropTypes.string.isRequired,
    currentDirection: PropTypes.string.isRequired,
    currentStationLat: PropTypes.number.isRequired,
    currentStationLon: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusInfo;