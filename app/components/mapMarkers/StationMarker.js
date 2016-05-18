var React = require('react');
var PropTypes = React.PropTypes;

const placeStyle = function (size, currentStation, stationId) {
    newSize = (currentStation === stationId) ? size * 2 : size
    return {
        position: 'absolute',
        border: newSize / 5 + 'px solid #000',
        backgroundColor: (currentStation === stationId) ? '#FFFF00' : 'rgba(252, 90, 44, 0.89)',
        textAlign: 'center',
        width: newSize,
        height: newSize,
        left: -newSize / 2,
        top: -newSize / 2,
        borderRadius: newSize,
        color: '#000',
        fontSize: 8,
        fontWeight: 'bold',
        padding: 0
    }
};


var StationMarker = React.createClass({
    render: function () {
        return (
            <div style={placeStyle(this.props.size, this.props.currentStation, this.props.stationId)}>
            </div>


        )
    }
});

StationMarker.propTypes = {
    $hover: PropTypes.bool
};

module.exports = StationMarker;