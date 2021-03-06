import React from 'react';
import {PropTypes} from 'react';

var ItineraryBusArrivals = require('./ItineraryBusArrivals');
var ItineraryNotFound = require('./ItineraryNotFound');
var ItineraryMap = require('./ItineraryMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    }
};

var ItineraryInfo = React.createClass({

    render: function () {
        var hasFinished = this.props.arrivalStationsWithBus.length == this.props.numItineraryResults;
        var noItinerayFound = this.props.arrivalStationsWithBus.map(function (arrSt) {
                return arrSt.services.length;
            }).reduce(function (total, num) {
                return total + num;
            }, 0) == 0;
        return (
            <div style={styles.container}>
                {
                    !hasFinished
                        ? <h1><img src={loadingImage} alt="Loading logo"/>Loading </h1>
                        : <ItineraryMap {...this.props}/>
                }
                {
                    !hasFinished
                        ? ''
                        : (noItinerayFound
                            ? <ItineraryNotFound {...this.props}/>
                            : <ItineraryBusArrivals {...this.props}/>
                    )
                }
            </div>
        )
    }
});

ItineraryInfo.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    arrivalStationsWithBus: PropTypes.array.isRequired,
    departureStation: PropTypes.object.isRequired,
    originalArrivalStation: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func.isRequired,
    callbackNotFoundFunction: PropTypes.func.isRequired,
    nearestStations: PropTypes.array
};

module.exports = ItineraryInfo;