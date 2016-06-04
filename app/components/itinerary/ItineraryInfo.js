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

var ItineraryInfo = React.createClass({
    
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading
                        ? <h1 style={styles.header}><img src={loadingImage} style={styles.image}/>Loading </h1>
                        : <ItineraryMap {...this.props}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <ItineraryBusArrivals {...this.props}/>
                }
            </div>
        )
    }
});

ItineraryInfo.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    arrivalStationsWithBus: PropTypes.array.isRequired,
    departureStation: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func.isRequired
};

module.exports = ItineraryInfo;