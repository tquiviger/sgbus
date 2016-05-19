var React = require('react');
var PropTypes = React.PropTypes;
var SearchBusStationContainer = require('../containers/search/SearchBusStationContainer');
var ToggleButton = require('../components/search/ToggleButton');
var Itinerary = require('../components/search/Itinerary');
var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '100%',
        width: '100%'
    },
    stationContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    },
    button: {
        float: 'right',
        alignItems: 'right',
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    }
};

var Home = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <ToggleButton
                    style={styles.button}
                    mode={this.props.mode}
                    buttonCallback={this.props.buttonCallback}/>
                <div style={styles.stationContainer}>
                    <h1 style={styles.header}>
                        {this.props.mode === 'station' ? 'Enter the name of a Bus Station' : 'Enter the departure Station'}
                    </h1>
                    <SearchBusStationContainer
                        mode={this.props.mode}
                    />
                </div>
            </div>
        )
    }
});

Home.propTypes = {
    buttonCallback: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

module.exports = Home;