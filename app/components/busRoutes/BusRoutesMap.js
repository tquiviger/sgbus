var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;

const stationMarkerSize = 8;
const defaultZoom = 11;

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '100%',
        // boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
    }
};

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
    }, render: function () {

        return (
            <div className="row" style={styles.container}>
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    center={{ lat: this.props.currentStationLat, lng: this.props.currentStationLon }}
                    defaultZoom={ defaultZoom }>
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