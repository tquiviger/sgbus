var React = require('react');
var PropTypes = React.PropTypes;
var SearchBusStation = require('./SearchBusStation');
var NearestBusStationContainer = require('../../containers/search/NearestBusStationContainer');
var backgroundImageBlue = require('file?name=[name].[ext]!../../images/pattern.svg');
var backgroundImageGreen = require('file?name=[name].[ext]!../../images/pattern-itinerary.svg');

var busLogo = require('file?name=[name].[ext]!../../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../../images/itineraryLogo.png');

var styles = function (mode) {
    var backgroundImage = backgroundImageBlue;
    return {
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
    }
};

var SearchMain = React.createClass({
    render: function () {
        var text;
        var image;
        var nearestBusStationContainer = <div className="container-fluid">
            <NearestBusStationContainer
                text="Find the nearest stations"
                mode={this.props.mode}/>
        </div>;

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
            <div style={styles(this.props.mode).container}>
                <div style={styles().mainIcons}>
                    <img src={image} style={styles().images}/>
                </div>
                <div style={styles().stationContainer}>
                    <h1 style={styles().header}>
                        {text}
                    </h1>
                    <SearchBusStation
                        mode={this.props.mode}
                        departureStation={this.props.departureStation}
                    />
                    {nearestBusStationContainer}
                </div>
            </div>
        )
    }
});


SearchMain.propTypes = {
    mode: PropTypes.string.isRequired
};


module.exports = SearchMain;