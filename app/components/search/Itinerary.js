var React = require('react');
var Config = require('Config');


var styles = {
    query: {
        fontSize: 20,
        color: '#333',
        fontWeight: 100
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right'
    }
};


var SearchBusStation = React.createClass({
    render : function() {
        return (
                <h1>{this.props.departureStation}</h1>
        )
    }
});



module.exports = SearchBusStation;