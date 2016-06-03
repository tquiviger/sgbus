var React = require('react');
var moment = require('moment');
var BusStationArrival = require('./BusStationArrival');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        height: '60%',
        overflowY: 'scroll',
        width: '100%'
    }
};


var BusStationArrivals = React.createClass({
    render: function () {
        return (
            <div className="row" style={styles.container}>
                <BusStationArrival
                    mode="station"
                    stationData={this.props.stationData}/>
            </div>
        )
    }
});

BusStationArrivals.propTypes = {
    stationData: PropTypes.object.isRequired
};

module.exports = BusStationArrivals;