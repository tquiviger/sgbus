var React = require('react');
var PropTypes = React.PropTypes;
var GetBusStation = require('../components/search/GetBusStation');

var GetBusStationContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        return {
            direction: 'column'
        }
    },
    propTypes: {
        direction: PropTypes.string
    },
    getInitialState: function () {
        return {
            busStation: '',
            busStationName: ''

        }
    },
    handleSubmitBusStation: function (e) {
        e.preventDefault()
        this.context.router.push('/detail/' + this.props.result._id)

    },
    handleUpdateBusStation: function (e) {
        this.setState({
            bus: e.target.value
        })
    },
    render: function () {
        return (
            <GetBusStation
                direction={this.props.direction}
                onSubmitBusStation={this.handleSubmitBusStation}
                onUpdateBusStation={this.handleUpdateBusStation}
                busStation={this.props.result._id}
                busStationName={this.props.result._source.Description}
            />
        )
    }
});

module.exports = GetBusStationContainer;
