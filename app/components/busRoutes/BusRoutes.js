var React = require('react');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    }
};


var BusRoutes = React.createClass({
    render: function () {
        var stationData = this.props.bus;
        return (
            <div style={styles.container}>
                    <h1>{stationData} </h1>
                    <h1>{ this.props.busData._source} </h1>
            </div>
        )
    }
});

BusRoutes.propTypes = {
    bus: PropTypes.string.isRequired,
    busData: PropTypes.object.isRequired
};

module.exports = BusRoutes;