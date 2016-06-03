var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;

const stationMarkerSize = 8;
const defaultZoom = 14;

var ItineraryMap = React.createClass({
    render: function () {
        var depStation = this.props.arrivalStationsWithBus[0].departureStation.stationDesc;
        var initialArrivalStation = this.props.arrivalStationsWithBus[0].arrivalStation;
        var lesBus = this.props.arrivalStationsWithBus.map(function (bus) {
            return bus.route
        })



        return (
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    defaultCenter={{ lat: initialArrivalStation.Latitude, lng: initialArrivalStation.Longitude }}
                    defaultZoom={ defaultZoom }>
                    <StationMarker
                        stationName={depStation.Description}
                        stationId=""
                        currentStation="NA"
                        rank="D"
                        size={stationMarkerSize*2}//forcing size to be doubled
                        lat={depStation.Latitude}
                        lng={depStation.Longitude}
                    />
                    {this.props.arrivalStationsWithBus.map(function (bus,rank) {
                        return (
                            <StationMarker
                                key={bus.arrivalStation.BusStopCode}
                                stationName={bus.arrivalStation.Description}
                                stationId={bus.arrivalStation.BusStopCode}//forcing color to be yellow
                                currentStation={bus.arrivalStation.BusStopCode}//forcing color to be yellow
                                rank={rank}
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
    arrivalStationsWithBus: PropTypes.array.isRequired
};

module.exports = ItineraryMap;