var React = require('react');
var Detail = require('./Detail');
var StationMap = require('./StationMap');
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

var BusStation = React.createClass({
    render: function () {

        return (
            <div style={styles.container}>
                {
                    this.props.isLoading === true
                        ? <h1 style={styles.header}> Loading </h1>
                        : <StationMap stationData={this.props.stationData}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <Detail stationData={this.props.stationData}/>
                }
            </div>
        )
    }
});

BusStation.propTypes = {
    stationData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusStation;