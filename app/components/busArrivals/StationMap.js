var React = require('react');
var GoogleMap = require('google-map-react')
var StationMarker = require('./mapMarkers/StationMarker')
var BusMarker = require('./mapMarkers/BusMarker')


function StationMap(props) {
    return (
        <GoogleMap
            bootstrapURLKeys={{  key: 'AIzaSyAhcYZVvNqQNkT8chx5FCVbErNI4YCUB0c',    language: 'fr'  }}
            center={{lat: props.stationData.stationDesc.Latitude, lng: props.stationData.stationDesc.Longitude}}
            defaultZoom={15}>
            {
                props.stationData.Services.map(function (result) {
                    return (
                        <BusMarker
                            key={result.ServiceNo}
                            lat={result.NextBus.Latitude}
                            lng={result.NextBus.Longitude}
                            busNumber={result.ServiceNo}/>)
                })
            }
            <StationMarker
                lat={props.stationData.stationDesc.Latitude}
                lng={props.stationData.stationDesc.Longitude}
                />
        </GoogleMap>
    )
}

module.exports = StationMap;