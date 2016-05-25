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
        var depStation = this.props.buses[0].departureStation.stationDesc;
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
                    {this.props.buses.map(function (bus) {
                        return (
                            <StationMarker
                                key={bus.arrivalStation.BusStopCode}
                                stationName={bus.arrivalStation.Description}
                                stationId={bus.arrivalStation.BusStopCode}
                                currentStation={bus.arrivalStation.BusStopCode}
                                size={stationMarkerSize}
                                lat={bus.arrivalStation.Latitude}
                                lng={bus.arrivalStation.Longitude}
                            />)
                    })
                    }
                </GoogleMap>
        )
    }
});

ItineraryMap.propTypes = {
    buses: PropTypes.array.isRequired
};

module.exports = ItineraryMap;