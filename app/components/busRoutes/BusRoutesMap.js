import React from 'react';
import GoogleMap from 'google-map-react';
import {PropTypes} from 'react';

var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var getMapBounds = require('../mapMarkers/MapUtils').getMapBounds;
var Config = require('Config');

var styles = {
    container: {
        height: '300px',
        width: '100%'
    }
};

const stationMarkerSize = 8;

var BusRoutesMap = React.createClass({
    getInitialState: function () {
        return {
            center: null,
            zoom: 12
        }
    },
    componentWillMount: function () {
        var defaults = getMapBounds(this.props.busData.routes_1);
        this.setState({
            center: defaults.center,
            zoom: defaults.zoom
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            center: {lat: nextProps.currentStationLat, lng: nextProps.currentStationLon}
        });
    },
    getStationsMarkers: function (routes, direction) {
        routes = direction === '1' ? routes.routes_1 : routes.routes_2;
        var rows = [];
        for (var i = 0; i < 110; i++) {
            var index = i < 10 ? '0' + i : i;
            if (routes['BusStopRoad_' + index] != null) {
                rows.push(
                    <StationMarker
                        stationName={routes['BusStopName_' + index]}
                        stationId={index+'_'+direction}
                        currentStation={this.props.currentStation}
                        key={index}
                        lat={routes['Latitude_' + index]}
                        size={stationMarkerSize}
                        lng={routes['Longitude_' + index]}
                    />
                );
            }

        }
        return rows;
    },
    render: function () {
        return (
            <div className="row" style={styles.container}>
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    center={this.state.center}
                    defaultZoom={ this.state.zoom }>
                    {this.getStationsMarkers(this.props.busData, this.props.currentDirection)}
                </GoogleMap>
            </div>
        )
    }
});

BusRoutesMap.propTypes = {
    busData: PropTypes.object.isRequired,
    currentStation: PropTypes.string,
    currentStationLat: PropTypes.number,
    currentStationLon: PropTypes.number,
    currentDirection: PropTypes.string.isRequired
};

module.exports = BusRoutesMap;