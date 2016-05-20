var React = require('react');
var PropTypes = React.PropTypes;
var SearchBusStation = require('../components/search/SearchBusStation');
var ToggleButton = require('../components/search/ToggleButton');
var NearestBusStationContainer = require('../containers/search/NearestBusStationContainer');
var backgroundImageBlue = require('file?name=[name].[ext]!../images/pattern.svg');
var backgroundImageGreen = require('file?name=[name].[ext]!../images/pattern-itinerary.svg');

var styles = function (mode) {
    var backgroundImage = mode === 'itinerary' ? backgroundImageGreen : backgroundImageBlue
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
        header: {
            fontSize: 45,
            color: '#fff',
            fontWeight: 100
        }
    }
};

var Home = React.createClass({
    render: function () {
        var text = this.props.departureStation == null ? 'Enter the departure Station' : 'Enter the arrival Station'
        return (
            <div style={styles(this.props.mode).container}>
                <div className="container-fluid">
                    <ToggleButton
                        mode={this.props.mode}
                        buttonCallback={this.props.buttonCallback}/>
                </div>
                <div style={styles().stationContainer}>
                    <h1 style={styles().header}>
                        {this.props.mode === 'station' ? 'Enter the name of a Bus Station' : text}
                    </h1>
                    <SearchBusStation
                        mode={this.props.mode}
                        departureStation={this.props.departureStation}
                    />
                    <NearestBusStationContainer
                        mode={this.props.mode}/>
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