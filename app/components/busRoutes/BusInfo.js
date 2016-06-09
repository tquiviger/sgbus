var React = require('react');
var BusRoutes = require('./BusRoutes');
var BusRoutesMap = require('./BusRoutesMap');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
};

var BusInfo = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading === true
                        ? <h1 style={styles.header}><img src={loadingImage} style={styles.image} alt="Loading logo"/>Loading
                    </h1>
                        : <section><BusRoutesMap
                        busData={this.props.busData}
                        currentDirection={this.props.currentDirection}
                        currentStation={this.props.currentStation}
                        currentStationLat={this.props.currentStationLat}
                        currentStationLon={this.props.currentStationLon}/></section>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <section><BusRoutes {...this.props}/></section>
                }
            </div>
        )
    }
});

BusInfo.propTypes = {
    busData: PropTypes.object.isRequired,
    onHoverStation: PropTypes.func.isRequired,
    callbackFunction: PropTypes.func.isRequired,
    currentStation: PropTypes.string.isRequired,
    currentDirection: PropTypes.string.isRequired,
    currentStationLat: PropTypes.number.isRequired,
    currentStationLon: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusInfo;