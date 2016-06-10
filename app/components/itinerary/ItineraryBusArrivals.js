var React = require('react');
var BusStationArrival = require('../busArrivals/BusStationArrival');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        height: '300px',
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
        var arrivalStationsWithBus = this.props.arrivalStationsWithBus;
        return (
            <div style={styles.container}>
                <div style={styles.title} className="container-fluid">
                    <h3>Available buses From <b>{this.props.departureStation.Description}</b> To </h3>
                </div>
                {arrivalStationsWithBus
                    .sort(function (a, b) {
                        return parseFloat(a.arrivalStation.distance) - parseFloat(b.arrivalStation.distance)
                    }).map(function (arrivalStation, rank) {
                            return (
                                <div className="container-fluid" style={styles.busLine}
                                     key={arrivalStation.arrivalStation.BusStopCode}>
                                    <BusStationArrival
                                        mode="itinerary"
                                        rank={rank}
                                        callbackFunction={this.props.callbackFunction}
                                        services={arrivalStation.services}
                                        stationData={this.props.departureStation}
                                        arrivalStation={arrivalStation.arrivalStation}/>
                                </div>
                            )
                        }.bind(this)
                    )
                }</div>)
    }
});

ItineraryBusArrivals.propTypes = {
    arrivalStationsWithBus: PropTypes.array.isRequired,
    departureStation: PropTypes.object.isRequired,
    callbackFunction: PropTypes.func
};

module.exports = ItineraryBusArrivals;