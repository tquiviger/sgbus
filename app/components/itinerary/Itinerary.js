var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var BusStationArrivals = require('../busArrivals/BusStationArrivals');
var ItineraryMap = require('./ItineraryMap');
var backgroundImageGreen = require('file?name=[name].[ext]!../../images/pattern-itinerary.svg');


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImageGreen + ')',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    }
};

var Itinerary = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading
                        ? <h1 style={styles.header}> Loading </h1>
                        : <ItineraryMap
                        buses={this.props.buses}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <BusStationArrivals
                        mode="itinerary"
                        stationData={this.props.buses.departureStation}
                        arrivalStation={this.props.buses.arrivalStation}/>
                }
            </div>
        )
    }
});

Itinerary.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    buses: PropTypes.object.isRequired
};

module.exports = Itinerary;