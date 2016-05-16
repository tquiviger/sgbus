var React = require('react');
var GoogleMap = require('google-map-react');
var StationMarker = require('./mapMarkers/StationMarker');
var BusMarker = require('./mapMarkers/BusMarker');
var Config = require('Config');
var PropTypes = React.PropTypes;

var StationMap = React.createClass({
    render: function () {
        var stationDesc = this.props.stationData.stationDesc;
        return (
            <GoogleMap
                bootstrapURLKeys={{ key: Config.GoogleMapsApiKey, language: 'fr' }}
                center={{ lat: stationDesc.Latitude, lng: stationDesc.Longitude }}
                defaultZoom={ 15 }>
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
                    lat={stationDesc.Latitude}
                    lng={stationDesc.Longitude}
                />
            </GoogleMap>
        )
    }
});

    StationMap.propTypes = {
    stationData: PropTypes.object.isRequired
};

module.exports = StationMap;