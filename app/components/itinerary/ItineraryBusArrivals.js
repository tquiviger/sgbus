var React = require('react');
var BusStationArrival = require('../busArrivals/BusStationArrival');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        height: '100%',
        overflowY: 'scroll',
        width: '100%'
    }
};


var ItineraryBusArrivals = React.createClass({
    render: function () {
        var buses = this.props.buses;
        return (
            <div  style={styles.container}>
                {buses.map(function (bus) {
                    return (
                        <div className="row" key={bus.arrivalStation.BusStopCode}>
                            <BusStationArrival
                                mode="itinerary"
                                var stationData={bus.departureStation}
                                arrivalStation={bus.arrivalStation}
                            />
                        </div>
                    )

                })}</div>)
    }
});

ItineraryBusArrivals.propTypes = {
    buses: PropTypes.array.isRequired
};

module.exports = ItineraryBusArrivals;