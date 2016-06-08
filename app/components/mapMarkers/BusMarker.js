var React = require('react');
var PropTypes = React.PropTypes;

const K_WIDTH = 20;
const K_HEIGHT = 10;

const placeStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    border: '3px solid #D35400',
    borderRadius: K_HEIGHT,
    backgroundColor: '#fff',
    textAlign: 'center',
    color: '#000',
    fontSize: 9,
    fontWeight: 700,
    padding: 3
};


var BusMarker = React.createClass({
    render: function () {
        return (
            <div style={placeStyle}>
                {this.props.busNumber}
            </div>
        )
    }
});

BusMarker.propTypes = {
    busNumber: PropTypes.string.isRequired
};

module.exports = BusMarker;