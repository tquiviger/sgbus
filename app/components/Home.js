var React = require('react');
var SearchBusStation = require('../components/search/SearchBusStation');
var NearestBusStationContainer = require('../containers/NearestBusStationContainer');
var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');


var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    }
};

var HomeContainer = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <h1 style={styles.header}>Enter the name of a Bus Station</h1>
                <SearchBusStation/>
                <NearestBusStationContainer/>
            </div>
        )
    }
});

module.exports = HomeContainer;