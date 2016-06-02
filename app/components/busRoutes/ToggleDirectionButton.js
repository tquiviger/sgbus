var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
    button: {
        fontWeight: 100,
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        outline: 'none'
    }
};


var ToggleDirectionButton = React.createClass({
    render: function () {
        return (
            <button
                type='button'
                style={styles.button}
                className='btn btn-primary'
                onClick={this.props.buttonCallback}>
                Direction  {this.props.currentDirection}
                <i style={{marginLeft :10}} className="fa fa-exchange"/>
            </button>
        )
    }
});

ToggleDirectionButton.propTypes = {
    buttonCallback: PropTypes.func.isRequired,
    currentDirection: PropTypes.string.isRequired
};

module.exports = ToggleDirectionButton;