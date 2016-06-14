var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var getMapBounds = require('../mapMarkers/MapUtils').getMapBounds;
var Config = require('Config');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        height: '300px',
        width: '100%'
    }
};

const stationMarkerSize = 8;

var BusRoutesMap = React.createClass({
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
        const {center, zoom} = getMapBounds(this.props.busData);
        return (
            <div className="row" style={styles.container}>
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    center={center}
                    defaultZoom={ zoom }>
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