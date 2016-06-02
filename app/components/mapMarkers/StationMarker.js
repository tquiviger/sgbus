var React = require('react');
var PropTypes = React.PropTypes;

const placeStyle = function (size, currentStation, stationId) {
    var isCurrentStation = (currentStation.localeCompare(stationId));
    var newSize = isCurrentStation ? size : size * 2;
    return {
        position: 'absolute',
        border: newSize / 5 + 'px solid #000',
        backgroundColor: isCurrentStation ? '#2980B9' : '#F7DC6F',
        textAlign: 'center',
        verticalAlign: 'center',
        width: newSize,
        height: newSize,
        left: -newSize / 2,
        top: -newSize / 2,
        borderRadius: newSize,
        color: '#000',
        fontSize: 11,
        padding: 0
    }
};


var StationMarker = React.createClass({
    render: function () {
        return (
            <div style={placeStyle(this.props.size, this.props.currentStation, this.props.stationId)}>
                {this.props.rank}
            </div>
        )
    }
});

StationMarker.propTypes = {
    currentStation: PropTypes.string.isRequired,
    stationId: PropTypes.string.isRequired

};

module.exports = StationMarker;