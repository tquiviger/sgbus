var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;


const stationMarkerSize = 8;
const defaultZoom = 11;
const defaultCenterLatitude = 1.3634594;
const defaultCenterLongitude = 103.8200663;

var BusRoutesMap = React.createClass({
    render: function () {
        var routes = this.props.busData._source;
        var rows = [];
        for (var i = 0; i < 110; i++) {
            var index = i < 10 ? '0' + i : i;
            if (routes['BusStopRoad.' + index] != null) {
                rows.push(
                    <StationMarker
                        stationName={routes['BusStopName.' + index]}
                        stationId={index}
                        currentStation={this.props.currentStation}
                        key={index}
                        lat={routes['Latitude.' + index]}
                        size={stationMarkerSize}
                        lng={routes['Longitude.' + index]}
                    />
                );
            }

        }
        return (
            <GoogleMap
                bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                center={{ lat: defaultCenterLatitude, lng: defaultCenterLongitude }}
                defaultZoom={ defaultZoom }>
                {
                    rows
                }
            </GoogleMap>
        )
    }
});

BusRoutesMap.propTypes = {
    busData: PropTypes.object.isRequired
};

module.exports = BusRoutesMap;