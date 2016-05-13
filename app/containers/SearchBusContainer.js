var React = require('react');
var SearchBus = require('../components/search/SearchBusStation');
var NearestBusStationContainer = require('./NearestBusStationContainer');

var styles = {
    container: {
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
        fontWeight: 100,
    }
}

var SearchBusContainer = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <h1 style={styles.header}>Enter the name of a Bus Station</h1>
                <NearestBusStationContainer/>
                <SearchBus
                />
            </div>
        );
    }
});

module.exports = SearchBusContainer;