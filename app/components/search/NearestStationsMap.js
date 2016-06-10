var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('../mapMarkers/StationMarker');
var BusMarker = require('../mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;

const stationMarkerSize = 8;
const defaultZoom = 16;

var styles = {
    container: {
        height: '300px',
        width: '60%',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'

    }
};

var NearestStationsMap = React.createClass({
        render: function () {
            var map = this.props.nearestStations.length == 0
                ? null :
                <GoogleMap
                    bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                    center={{ lat:  this.props.userCoord.lat, lng: this.props.userCoord.lng }}
                    defaultZoom={ defaultZoom }>
                    <StationMarker
                        key={0}
                        stationName={"USER"}
                        stationId="USER"
                        currentStation="USER"
                        size={stationMarkerSize}
                        lat={this.props.userCoord.lat}
                        lng={this.props.userCoord.lng}/>
                    {
                        this.props.nearestStations.map(function (result, rank) {
                            return (
                                <StationMarker
                                    key={result._source.BusStopCode}
                                    stationName={result._source.Description}
                                    stationId=""
                                    rank={rank+1}
                                    currentStation="NA"
                                    size={stationMarkerSize*2}
                                    lat={result._source.Latitude}
                                    lng={result._source.Longitude}/>)

                        })
                    }
                </GoogleMap>;
            return (
                <div className="row" style={styles.container}>
                    {map}
                </div>

            )
        }
    })
    ;

NearestStationsMap.propTypes = {
    nearestStations: PropTypes.array.isRequired
};

module.exports = NearestStationsMap;