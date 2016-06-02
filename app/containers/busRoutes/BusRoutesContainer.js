var React = require('react');
var BusInfo = require('../../components/busRoutes/BusInfo');
var getBusAndRoutesInfo = require('../../helpers/api').getBusAndRoutesInfo;


const defaultCenterLatitude = 1.3634594;
const defaultCenterLongitude = 103.8200663;

var BusRoutesContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoading: true,
            busData: {},
            currentStation: '',
            currentDirection: '1',
            currentStationLat: defaultCenterLatitude,
            currentStationLon: defaultCenterLongitude,
            onHoverStation: this.onHoverStation
        }
    },
    switchButonCallback: function () {
        var currentState = this.state.currentDirection;
        var currentRoutes = currentState == '1' ? this.state.busData.routes_2 : this.state.busData.routes_1;
        this.setState({
            currentDirection: currentState == '1' ? '2' : '1',
            currentStationLat: currentRoutes['Latitude_01'],
            currentStationLon: currentRoutes['Longitude_01']
        })
    },
    componentDidMount: function () {
        this.makeRequest(this.props.routeParams.bus);
    },
    makeRequest: function (bus) {
        getBusAndRoutesInfo(bus)
            .then(function (busData) {
                this.setState({
                    isLoading: false,
                    busData: busData,
                    currentStationLat: busData.routes_1['Latitude_01'],
                    currentStationLon: busData.routes_1['Longitude_01']
                });
            }.bind(this));
    },
    updateData: function () {
        var busData = this.state.busData;
        this.setState({
            busData: busData
        });
    },
    onHoverStation: function (e) {
        e.preventDefault();
        var stationClicked = e.currentTarget.id.split('|');
        this.setState({
            currentStation: stationClicked[0],
            currentStationLat: Number(stationClicked[1]),
            currentStationLon: Number(stationClicked[2])
        });
    },
    render: function () {
        return (
            <BusInfo
                isLoading={this.state.isLoading}
                busData={this.state.busData}
                currentStation={this.state.currentStation}
                currentDirection={this.state.currentDirection}
                switchButonCallback={this.switchButonCallback}
                currentStationLat={this.state.currentStationLat}
                currentStationLon={this.state.currentStationLon}
                onHoverStation={this.state.onHoverStation}
            />
        )
    }
});

module.exports = BusRoutesContainer;