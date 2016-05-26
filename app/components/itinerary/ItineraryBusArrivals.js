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
    },
    title: {
        textAlign: 'left'
    }
};


var ItineraryBusArrivals = React.createClass({
    render: function () {
        var buses = this.props.buses;
        return (
            <div style={styles.container}>
                <div style={styles.title} className="container-fluid">
                    <h3>Available buses From <b>{buses[0].departureStation.stationDesc.Description}</b> To </h3>
                </div>
                {buses
                    .sort(function (a, b) {
                        return parseFloat(a.arrivalStation.distance) - parseFloat(b.arrivalStation.distance)
                    }).map(function (bus, rank) {
                            return (
                                <div className="container-fluid" style={styles.busLine}
                                     key={bus.arrivalStation.BusStopCode}>
                                    <BusStationArrival
                                        mode="itinerary"
                                        rank={rank}
                                        stationData={bus.departureStation}
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