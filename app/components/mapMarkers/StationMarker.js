var React = require('react');

const K_WIDTH = 20;
const K_HEIGHT = 20;

const placeStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    border: '4px solid #000',
    borderRadius: K_HEIGHT,
    backgroundColor: 'rgba(252, 90, 44, 0.89)',
    textAlign: 'center',
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    padding: 0
};


var StationMarker = React.createClass({
    render: function () {
        return (
            <div style={placeStyle}></div>
        )
    }
});

module.exports = StationMarker;