var React = require('react');
var BusRoutes = require('./BusRoutes');
var BusRoutesMap = require('./BusRoutesMap');
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

var BusInfo = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.isLoading === true
                        ? <h1 style={styles.header}> Loading </h1>
                        : <BusRoutesMap
                        busData={this.props.busData}
                        currentStation={this.props.currentStation}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <BusRoutes
                        busData={this.props.busData}
                        onHoverStation={this.props.onHoverStation}/>
                }
            </div>
        )
    }
});

BusInfo.propTypes = {
    busData: PropTypes.object.isRequired,
    onHoverStation: PropTypes.func.isRequired,
    currentStation: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusInfo;