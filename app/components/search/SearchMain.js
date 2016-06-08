var React = require('react');
var PropTypes = React.PropTypes;
var SearchBusStation = require('./SearchBusStation');
var NearestBusStationContainer = require('../../containers/search/NearestBusStationContainer');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');

var busLogo = require('file?name=[name].[ext]!../../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../../images/itineraryLogo.png');

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '100%',
        width: '100%'

    },
    searchStationContainer: {
        width: '100%'
    },
    nearestStationContainer: {
        width: '100%'
    },
    stationContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mainIcons: {
        display: 'flex',
        align: 'middle',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    },
    images: {
        width: 50,
        paddingTop: 30
    }
};

var SearchMain = React.createClass({
    render: function () {
        var text;
        var image;
        var nearestBusStationContainer =
            <NearestBusStationContainer style={styles.nearestStationContainer} {...this.props}
                                        text="Find the nearest stations"/>;
        switch (this.props.mode) {
            case "stations":
                text = "Enter a bus station";
                image = busStopLogo;
                break;
            case "buses":
                text = "Enter a bus #";
                image = busLogo;
                nearestBusStationContainer = null;
                break;
            case "itineraries":
                text = "Enter the departure Station";
                image = itineraryLogo;
                break;
            case "itineraries2":
                text = "Enter the arrival Station";
                image = itineraryLogo;
        }
        return (
            <div style={styles.container}>
                <div style={styles.searchStationContainer}>
                    <div style={styles.mainIcons}>
                        <img src={image} style={styles.images}/>
                    </div>
                    <div style={styles.stationContainer}>
                        <h1 style={styles.header}>
                            {text}
                        </h1>
                        <SearchBusStation style={styles.searchStationContainer} {...this.props}/>
                    </div>
                </div>
                <div style={styles.nearestStationContainer}>
                    {nearestBusStationContainer}
                </div>
            </div>
        )
    }
});


SearchMain.propTypes = {
    mode: PropTypes.string.isRequired,
    currentPath: PropTypes.string
};


module.exports = SearchMain;