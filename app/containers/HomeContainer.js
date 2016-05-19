var React = require('react');
var Home = require('../components/Home');

var HomeContainer = React.createClass({
    getInitialState: function () {
        return {
            mode: 'station',
            buttonCallback: this.switchToItinerayMode
        }
    },
    switchToItinerayMode: function () {
        this.setState({
            mode: 'itineray',
            buttonCallback: this.switchToStationMode
        });
    },
    switchToStationMode: function () {
        this.setState({
            mode: 'station',
            buttonCallback: this.switchToItinerayMode
        });
    },
    render: function () {
        return (
            <Home
                mode={this.state.mode}
                buttonCallback={this.state.buttonCallback}
            />
        )
    }
});

module.exports = HomeContainer;