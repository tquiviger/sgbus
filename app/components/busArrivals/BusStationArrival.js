var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var styles = {
    container: {
        fontSize: 15
    },
    icon: {
        marginRight: 3
    }
};


function getInterval(status, date) {
    var interval = '';
    if (status != 'In Operation') {
        return <td/>
    }
    if (date) {
        interval = moment(date).fromNow(true).replace('minute', 'min').replace('a min', ' 1 min');
        if (interval === 'a few seconds') {
            interval = <b>Arrived</b>
        }
    }
    return (
        <td>
            {interval}
        </td>
    )
}


var BusStationArrival = React.createClass({
    render: function () {
        var stationData = this.props.stationData;
        return (
                <div style={styles.container}>
                    {
                        this.props.mode === 'itinerary' ?
                            <div className="col-md-4">
                                <h1>Available buses </h1>
                                <h4>From {stationData.stationDesc.Description}</h4>
                                <h4>To {this.props.arrivalStation.Description}</h4>
                            </div>
                            : <div className="col-md-4">
                            <h1>{stationData.stationDesc.Description} </h1>
                            <h4>{stationData.stationDesc.RoadName}</h4>
                            <h4>#{stationData.BusStopID}</h4>
                        </div>
                    }
                    <div className="col-md-7">
                        <table className="table table-condensed">
                            <thead>
                            <tr style={{textAlign:'center'}}>
                                <th>Status</th>
                                <th>Bus #</th>
                                <th>Operator</th>
                                <th><i style={styles.icon} className="fa fa-clock-o" aria-hidden="true"/>1st Bus</th>
                                <th><i style={styles.icon} className="fa fa-clock-o" aria-hidden="true"/>2nd Bus</th>
                                <th><i style={styles.icon} className="fa fa-clock-o" aria-hidden="true"/>3rd Bus</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stationData.Services.map(function (result) {
                                return (
                                    <tr key={result.OriginatingID+result.ServiceNo}>
                                        <td>
                                            { result.Status === 'In Operation'
                                                ? <i className="fa fa-check-circle" aria-hidden="true"/>
                                                : <i className="fa fa-times-circle" aria-hidden="true"/>
                                            }
                                        </td>
                                        <td>
                                            <Link
                                                to={'/routes/'+result.ServiceNo}><strong>Bus {result.ServiceNo}</strong></Link>
                                        </td>
                                        <td dataToggle="tooltip" dataPlacement="left"
                                            title="Tooltip on left">{result.Operator}</td>
                                        {getInterval(result.Status, result.NextBus.EstimatedArrival)}
                                        {getInterval(result.Status, result.SubsequentBus.EstimatedArrival)}
                                        {getInterval(result.Status, result.SubsequentBus3.EstimatedArrival)}
                                    </tr>)
                            })}
                            </tbody>
                        </table>
                        <small>Data are refreshed every 5 seconds</small>
                    </div>


                </div>
        )
    }
});

BusStationArrival.propTypes = {
    stationData: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    arrivalStation: PropTypes.object
};

module.exports = BusStationArrival;