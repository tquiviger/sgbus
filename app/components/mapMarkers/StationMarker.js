var React = require('react');
var PropTypes = React.PropTypes;

const placeStyle = function (size, currentStation, stationId) {
    newSize = (currentStation.localeCompare(stationId)) ? size : size * 2
    return {
        position: 'absolute',
        border: newSize / 5 + 'px solid #000',
        backgroundColor: (currentStation.localeCompare(stationId)) ? '#2980B9' : '#F7DC6F',
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
            <div style={placeStyle(this.props.size, this.props.currentStation, this.props.stationId)}></div>
        )
    }
});

StationMarker.propTypes = {
    currentStation: PropTypes.string.isRequired,
    stationId: PropTypes.string.isRequired

};

module.exports = StationMarker;