var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('underscore');

var styles = function (additionalStyle) {
    return _.extend({
        fontWeight: 100,
        marginTop: 10,
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        outline: 'none'
    }, additionalStyle);
};


var ToggleButton = React.createClass({
    render: function () {
        return (
            <button
                type='button'
                style={styles(this.props.additionalStyle)}
                className='btn btn-primary'
                onClick={this.props.buttonCallback}>
                <i style={{marginRight :10}} className="fa fa-exchange"/>
                {this.props.text}
            </button>
        )
    }
});

ToggleButton.propTypes = {
    buttonCallback: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    additionalStyle: PropTypes.object
};

module.exports = ToggleButton;