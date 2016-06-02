var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;

const stationMarkerSize = 8;
const defaultZoom = 12;

var BusRoutesMap = React.createClass({
    getStationsMarkers: function (routes, direction) {
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
    }, render: function () {
        var rowsRoutes1 = this.getStationsMarkers(this.props.busData.routes_1, 1);
        var rowsRoutes2 = this.getStationsMarkers(this.props.busData.routes_2, 2);
        return (
            <GoogleMap
                bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                center={{ lat: this.props.currentStationLat, lng: this.props.currentStationLon }}
                defaultZoom={ defaultZoom }>
                { rowsRoutes1 }
                { rowsRoutes2 }
            </GoogleMap>
        )
    }
});

BusRoutesMap.propTypes = {
    busData: PropTypes.object.isRequired,
    currentStation: PropTypes.string,
    currentStationLat: PropTypes.number,
    currentStationLon: PropTypes.number
};

module.exports = BusRoutesMap;