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
                        : <BusRoutesMap busData={this.props.busData}/>
                }
                {
                    this.props.isLoading === true
                        ? ''
                        : <BusRoutes bus={this.props.bus} busData={this.props.busData}/>
                }
            </div>
        )
    }
});

BusInfo.propTypes = {
    busData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

module.exports = BusInfo;