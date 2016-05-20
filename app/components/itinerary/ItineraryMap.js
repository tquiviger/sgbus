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

var ItineraryMap = React.createClass({
    render: function () {
        var depStation = this.props.buses.departureStation.stationDesc;
        var arrStation = this.props.buses.arrivalStation;
        return (
            <GoogleMap
                bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                defaultCenter={{ lat: defaultCenterLatitude, lng: defaultCenterLongitude }}
                defaultZoom={ defaultZoom }>
                <StationMarker
                    stationName={depStation.Description}
                    stationId=""
                    currentStation="NA"
                    size={stationMarkerSize}
                    lat={depStation.Latitude}
                    lng={depStation.Longitude}
                />
                <StationMarker
                    stationName={arrStation.Description}
                    stationId=""
                    currentStation="NA"
                    size={stationMarkerSize}
                    lat={arrStation.Latitude}
                    lng={arrStation.Longitude}
                />
            </GoogleMap>
        )
    }
});

ItineraryMap.propTypes = {
    buses: PropTypes.object.isRequired
};

module.exports = ItineraryMap;