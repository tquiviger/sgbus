var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var ItineraryBusArrivals = require('./ItineraryBusArrivals');
var ItineraryNotFound = require('./ItineraryNotFound');
var ItineraryMap = require('./ItineraryMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var backgroundImageItineraries = require('file?name=[name].[ext]!../../images/pattern-itineraries.svg');

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImageItineraries + ')',
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
        var itinerariesSize = this.props.arrivalStationsWithBus.map(function (arrSt) {
            return arrSt.services.length;
        }).reduce(function (total, num) {
            return total + num;
        }, 0);
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
                        : (itinerariesSize != 0
                            ? <ItineraryBusArrivals {...this.props}/>
                            : <ItineraryNotFound {...this.props}/>
                    )


                }
            </div>
        )
    }
});

ItineraryInfo.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    arrivalStationsWithBus: PropTypes.array.isRequired,
    departureStation: PropTypes.object.isRequired,
    originalArrivalStation: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func.isRequired,
    callbackNotFoundFunction: PropTypes.func.isRequired,
    nearestStations: PropTypes.array
};

module.exports = ItineraryInfo;