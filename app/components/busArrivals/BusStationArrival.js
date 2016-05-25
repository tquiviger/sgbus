var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var styles = {
    container: {
        fontSize: 15,
        verticalAlign: 'center'
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

function buildArrivalTab(stationData) {
    return (
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
    )
}


var BusStationArrival = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.mode === 'itinerary' ?
                        <div className="col-md-4">
                            <h4>To
                                <Link style={{marginLeft:3}}
                                      to={'/detail/'+this.props.arrivalStation.BusStopCode}>
                                    <b>{this.props.arrivalStation.Description}</b>{  ' ('
                                + Math.round(Number(this.props.arrivalStation.distance))
                                + ' meters)'}
                                </Link>
                            </h4>
                        </div>
                        : <div className="col-md-4">
                        <h1>{this.props.stationData.stationDesc.Description} </h1>
                        <h4>{this.props.stationData.stationDesc.RoadName}</h4>
                        <h4>#{this.props.stationData.BusStopID}</h4>
                    </div>
                }
                <div className="col-md-7">{
                    this.props.stationData.Services.length === 0
                        ? <h4>No available bus</h4>
                        : (buildArrivalTab(this.props.stationData))}
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