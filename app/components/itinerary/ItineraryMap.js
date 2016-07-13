import React from 'react';
import GoogleMap from 'google-map-react';
import {PropTypes} from 'react';

var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var getMapBoundsItinerary = require('../mapMarkers/MapUtils').getMapBoundsItinerary;
var Config = require('Config');

const stationMarkerSize = 10;
var defaults;

var styles = {
    container: {
        height: '300px',
        width: '100%'
    }
};

var ItineraryMap = React.createClass({
        componentWillMount: function () {
            defaults = getMapBoundsItinerary(this.props.arrivalStationsWithBus, this.props.departureStation);
        },
        render: function () {
            var depStation = this.props.departureStation;
            var busMap = {};
            this.props.arrivalStationsWithBus.forEach(function (station) {
                station.services.forEach(function (bus) {
                    busMap[(station.arrivalStation.BusStopCode + '_' + bus.ServiceNo)] = bus.route
                })
            });
            var routeClicked = this.props.routeClicked;
            var rows = [];
            if (routeClicked) {
                rows = busMap[this.props.routeClicked].map(function (coord) {
                        return <StationMarker
                            stationId='route'
                            currentStation='NA'
                            key={routeClicked+coord.id}
                            lat={coord.lat}
                            size={stationMarkerSize}
                            lng={coord.lng}/>
                    }
                );
            }

            return (
                <div className="row" style={styles.container}>
                    <GoogleMap
                        bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                        center={defaults.center}
                        defaultZoom={ defaults.zoom }>
                        {
                            rows
                        }
                        <StationMarker
                            stationName={depStation.Description}
                            stationId=""
                            currentStation="NA"
                            rank="D"
                            size={stationMarkerSize*2}//forcing size to be doubled
                            lat={depStation.Latitude}
                            lng={depStation.Longitude}
                        />
                        {this.props.arrivalStationsWithBus.map(function (bus, rank) {
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
                </div>
            )
        }
    })
    ;

ItineraryMap.propTypes = {
    arrivalStationsWithBus: PropTypes.array.isRequired,
    routeClicked: PropTypes.string
};

module.exports = ItineraryMap;