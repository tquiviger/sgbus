var React = require('react');
var BusStationArrivals = require('./BusStationArrivals');
var BusStationMap = require('./BusStationMap');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
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
                        ? <h1 style={styles.header}><img src={loadingImage} style={styles.image} alt="Loading logo"/>
                        Loading </h1>
                        : <BusStationMap {...this.props}/>
                }
                {
                    this.props.isLoading
                        ? ''
                        : <BusStationArrivals {...this.props}/>
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