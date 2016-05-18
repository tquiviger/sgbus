var React = require('react');
var GetBusStation = require('../components/search/GetBusStation');
var withRouter = require('react-router').withRouter;

var GetBusStationContainer = React.createClass({
    getInitialState: function () {
        return {
            busStation: '',
            busStationName: ''
        }
    },
    handleSubmitBusStation: function (e) {
        e.preventDefault();
        this.props.router.push('/detail/' + this.props.result._id)

    },
    handleUpdateBusStation: function (e) {
        this.setState({
            bus: e.target.value
        })
    },
    render: function () {
        return (
            <GetBusStation
                onSubmitBusStation={this.handleSubmitBusStation}
                onUpdateBusStation={this.handleUpdateBusStation}
                busStation={this.props.result._id}
                busStationName={this.props.result._source.Description}
            />
        )
    }
});

module.exports = withRouter(GetBusStationContainer);
