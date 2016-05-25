var React = require('react');
var BusStationArrivals = require('./BusStationArrivals');
var BusStationMap = require('./BusStationMap');
var backgroundImageBlue = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImageBlue + ')',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
};

var BusStationInfo = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading
                        ? <h1 style={styles.header}> Loading </h1>
                        : <BusStationMap
                        stationData={this.props.stationData}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <BusStationArrivals
                        stationData={this.props.stationData}/>
                }
            </div>
        )
    }
});

BusStationInfo.propTypes = {
    stationData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusStationInfo;