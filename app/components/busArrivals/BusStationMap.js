import React from 'react';
import GoogleMap from 'google-map-react';
import {PropTypes} from 'react';

var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');

const stationMarkerSize = 20;
const defaultZoom = 15;

var styles = {
    container: {
        height: '300px',
        width: '100%'
    }
};

var BusStationMap = React.createClass({
    render: function () {
        var stationDesc = this.props.stationData.stationDesc;
        return (
            <div style={styles.container}>
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    center={{ lat: stationDesc.Latitude, lng: stationDesc.Longitude }}
                    defaultZoom={ defaultZoom }>
                    {
                        this.props.stationData.Services.map(function (result) {
                            return (
                                <BusMarker
                                    key={result.ServiceNo+result.OriginatingID}
                                    lat={result.NextBus.Latitude}
                                    lng={result.NextBus.Longitude}
                                    busNumber={result.ServiceNo}/>)
                        })
                    }
                    <StationMarker
                        stationName={stationDesc.Description}
                        stationId=""
                        currentStation="NA"
                        size={stationMarkerSize}
                        lat={stationDesc.Latitude}
                        lng={stationDesc.Longitude}
                    />
                </GoogleMap>
            </div>
        )
    }
});

BusStationMap.propTypes = {
    stationData: PropTypes.object.isRequired
};

module.exports = BusStationMap;