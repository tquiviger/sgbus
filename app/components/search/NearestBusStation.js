import React from 'react';
import {PropTypes} from 'react';
import Link from 'react-router/lib/Link'
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var one = require('file?name=[name].[ext]!../../images/one.png');
var two = require('file?name=[name].[ext]!../../images/two.png');
var three = require('file?name=[name].[ext]!../../images/three.png');
var four = require('file?name=[name].[ext]!../../images/four.png');
var NearestStationsMap = require('./NearestStationsMap');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'right',
        height: '100%'
    },
    buttons: {
        display: 'flex',
        align: 'middle',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 10
    },
    image: {
        width: 60
    },
    icon: {
        marginRight: 5
    }
};

function getStationNameAndDistance(stationData) {
    return stationData._source.Description
        + ' ('
        + Math.round(Number(stationData.sort[0]))
        + ' meters)'
}

var FindNearestButton = function (props) {
    var nearestStationsButtons = props.nearestStations.map(function (result, rank) {
        var path = props.mode === 'stations' ? '/stations' : '/itineraries';
        path = props.mode === 'itineraries2'
            ?
            (props.originalArrivalStation
                ? '/itineraries/' + result._id + '/' + props.originalArrivalStation._id
                : props.currentPath + '/' + result._id)
            : path + '/' + result._id;

        var numberLogo;
        switch (rank) {
            case 0:
                numberLogo = one;
                break;
            case 1:
                numberLogo = two;
                break;
            case 2:
                numberLogo = three;
                break;
            case 3:
                numberLogo = four;


        }
        return (

            <Link to={path} key={result._id}>
                <button type='button'
                        key={result._id}
                        style={styles.button}
                        className='btn btn-primary btn-sm'
                        value={props.nearestStationId}>
                    <img style={{width:16,height:16, marginRight:5}} src={numberLogo} alt="Number logo"/>
                    <span style={{verticalAlign: 'middle'}}>{getStationNameAndDistance(result)}</span>
                </button>
            </Link>
        )
    });

    return (
        <div style={styles.container}>
            { props.isLoading
                ? <img src={loadingImage} style={styles.image} alt="Loading logo"/>
                : <button type='button'
                          style={styles.button}
                          className='btn btn-warning'
                          onClick={props.callbackFunction}>
                <i style={styles.icon} className="fa fa-map-o"/>{props.text}
            </button>
            }
            <div style={styles.buttons}>{nearestStationsButtons}</div>
            {props.nearestStations.length > 0 && props.userCoord
                ? <NearestStationsMap {...props}/>
                : null }
        </div>
    )
};


var NearestBusStation = React.createClass({
    render: function () {
        return (
            <FindNearestButton {...this.props}/>
        )
    }
});

NearestBusStation.propTypes = {
    callbackFunction: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nearestStations: PropTypes.array.isRequired,
    userCoord: PropTypes.object,
    mode: PropTypes.string.isRequired,
    originalArrivalStation: PropTypes.object
};

module.exports = NearestBusStation;