var React = require('react');
var Home = require('../components/Home');

var HomeContainer = React.createClass({
    getInitialState: function () {
        return {
            departureStation: {},
            arrivalStation: {},
            buttonCallback: this.updateDepartureStation
        }
    },
    updateDepartureStation: function () {
        this.setState({
            departureStation: {id: 1, name: "La station"},
            buttonCallback: this.updateArrivalStation()
        });
    },
    updateArrivalStation: function () {
        this.setState({
            departureStation: {id: 2, name: "L'autre station"}
        });
    },
    render: function () {
        return (
            <Home/>
        )
    }
});

module.exports = HomeContainer;
