var React = require('react');
var BusStationArrivals = require('./BusStationArrivals');
var BusStationMap = require('./BusStationMap');
var PropTypes = React.PropTypes;

var styles = {
    container: {
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
                    this.props.isLoading === true
                        ? <h1 style={styles.header}> Loading </h1>
                        : <BusStationMap stationData={this.props.stationData}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <BusStationArrivals stationData={this.props.stationData}/>
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