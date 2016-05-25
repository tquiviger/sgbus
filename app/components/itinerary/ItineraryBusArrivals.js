var React = require('react');
var BusStationArrival = require('../busArrivals/BusStationArrival');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        height: '100%',
        overflowY: 'scroll',
        width: '100%'
    },
    busLine: {
        borderTop: 'solid thin #3c8860'
    }
};


var ItineraryBusArrivals = React.createClass({
    render: function () {
        var buses = this.props.buses;
        return (
            <div style={styles.container}>
                <div className="container-fluid">
                    <h1>Available buses </h1>
                    <h4>From <b>{buses[0].departureStation.stationDesc.Description}</b></h4>
                </div>
                {buses.map(function (bus) {
                        return (
                            <div className="row" style={styles.busLine} key={bus.arrivalStation.BusStopCode}>
                                <BusStationArrival
                                    mode="itinerary"
                                    var stationData={bus.departureStation}
                                    arrivalStation={bus.arrivalStation}/>
                            </div>
                        )
                    }
                )
                }</div>)
    }
});

ItineraryBusArrivals.propTypes = {
    buses: PropTypes.array.isRequired
};

module.exports = ItineraryBusArrivals;