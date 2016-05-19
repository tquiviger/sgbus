var React = require('react');
var Config = require('Config');


var styles = {
    button: {
        fontSize: 20,
        color: '#333',
        fontWeight: 100
    }
};


var SearchBusStation = React.createClass({
    render: function () {
        return (
            <button style={styles.button}
                    type='button'
                    style={{margin: 9}}
                    className='btn btn-info'
            >w</button>
        )
    }
});


module.exports = SearchBusStation;