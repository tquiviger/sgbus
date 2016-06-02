var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
    button: {
        float: 'right',
        fontWeight: 100,
        marginTop: 10,
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        outline: 'none'
    }
};


var ToggleModeButton = React.createClass({
    render: function () {
        return (
            <button
                type='button'
                style={styles.button}
                className='btn btn-primary'
                onClick={this.props.buttonCallback}>
                <i style={{marginRight :10}} className="fa fa-exchange"/>
                {this.props.mode === 'station' ? 'Switch to Itinerary' : 'Switch to Bus Station'}
            </button>
        )
    }
});

ToggleModeButton.propTypes = {
    buttonCallback: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

module.exports = ToggleModeButton;