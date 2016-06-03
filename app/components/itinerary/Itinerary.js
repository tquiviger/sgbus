var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var ItineraryBusArrivals = require('./ItineraryBusArrivals');
var ItineraryMap = require('./ItineraryMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
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
                        ? <h1 style={styles.header}> <img src={loadingImage} style={styles.image}/>Loading </h1>
                        : <ItineraryMap
                        arrivalStationsWithBus={this.props.arrivalStationsWithBus}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <ItineraryBusArrivals
                        mode="itinerary"
                        arrivalStationsWithBus={this.props.arrivalStationsWithBus}/>
                }
            </div>
        )
    }
});

Itinerary.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    arrivalStationsWithBus: PropTypes.array.isRequired
};

module.exports = Itinerary;