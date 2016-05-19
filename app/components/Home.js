var React = require('react');
var SearchBusStationContainer = require('../containers/search/SearchBusStationContainer');
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

var Home = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <h1 style={styles.header}>Enter the name of a Bus Station</h1>
                <SearchBusStationContainer/>
            </div>
        )
    }
});

module.exports = Home;