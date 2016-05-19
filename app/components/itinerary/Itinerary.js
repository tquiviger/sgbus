var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var BusList = require('./BusList');
var ItineraryMap = require('./ItineraryMap');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
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
                    this.props.isLoading === true
                        ? <h1 style={styles.header}> Loading </h1>
                        : <ItineraryMap
                        buses={this.props.buses}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <BusList
                        buses={this.props.buses}/>
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