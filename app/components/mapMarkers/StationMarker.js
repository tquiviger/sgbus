var React = require('react');


const placeStyle = function (size) {
    return {
        position: 'absolute',
        border: size / 5 + 'px solid #000',
        backgroundColor: 'rgba(252, 90, 44, 0.89)',
        textAlign: 'center',
        width: size,
        height: size,
        left: -size / 2,
        top: -size / 2,
        borderRadius: size,
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
        padding: 0
    }
};


var StationMarker = React.createClass({
    render: function () {
        return (
            <div
                style={placeStyle(this.props.size)}
            ></div>
        )
    }
});

module.exports = StationMarker;