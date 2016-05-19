var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;

var styles = {
    button: {
        float: 'right',
        fontWeight: 100,
        margin: 10,
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        outline: 'none'
    }
};


var ToggleButton = React.createClass({
    render: function () {
        return (
            <button
                type='button'
                style={styles.button}
                className='btn btn-primary'
                onClick={this.props.buttonCallback}>
                <span style={{marginRight :10}} className="glyphicon glyphicon-transfer"/>
                {this.props.mode === 'station' ? 'Switch to Itinerary' : 'Switch to Bus Station'}
            </button>
        )
    }
});

ToggleButton.propTypes = {
    buttonCallback: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

module.exports = ToggleButton;