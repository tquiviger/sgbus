var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var styles = function (isInOperation) {
    return {
        container: {
            fontSize: 17
        },
        icon: {
            marginRight: 3
        },
        links: {
            color: '#000'
        },
        row: {
            opacity: isInOperation ? 1 : 0.3
        }
    }
};


function getInterval(status, date) {
    var interval = '';
    if (status != 'In Operation') {
        return <td/>
    }
    if (date) {
        interval = moment(date).fromNow(true)
            .replace('minute', 'min')
            .replace('a min', ' 1 min');
        if (interval === 'a few seconds') {
            interval = <b>Arrived</b>
        }
    }
    return (<td>{interval}</td>)
}

function getDistance(distance) {
    return distance === 0 ? '' : ' (' + Math.round(Number(distance)) + ' meters)'
}

function buildArrivalTab(stationData) {
    return (
        <table className="table table-condensed">
            <thead>
            <tr style={{textAlign:'center'}}>
                <th>Status</th>
                <th>Bus #</th>
                <th>Operator</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>1st Bus</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>2nd Bus</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>3rd Bus</th>
            </tr>
            </thead>
            <tbody>
            {stationData.Services.map(function (result) {
                    return (
                        <tr key={result.OriginatingID+result.ServiceNo}
                            style={styles(result.Status === 'In Operation').row}>
                            <td>
                                { result.Status === 'In Operation'
                                    ? <i className="fa fa-check-circle"/>
                                    : <i className="fa fa-times-circle"/>
                                }
                            </td>
                            <td>
                                <Link style={styles().links} to={'/routes/'+result.ServiceNo}>
                                    <strong>Bus {result.ServiceNo}</strong>
                                </Link>
                            </td>
                            <td>{result.Operator}</td>
                            {getInterval(result.Status, result.NextBus.EstimatedArrival)}
                            {getInterval(result.Status, result.SubsequentBus.EstimatedArrival)}
                            {getInterval(result.Status, result.SubsequentBus3.EstimatedArrival)}
                        </tr>
                    )
                }
            )
            }
            </tbody>
        </table>
    )
}


var BusStationArrival = React.createClass({
    render: function () {
        return (
            <div style={styles().container}>
                {
                    this.props.mode === 'itinerary'
                        ?
                        <div className="col-md-4">
                            <h4>
                                <b>{this.props.rank} </b>
                                <i style={styles().icon} className="fa fa-arrow-circle-right"/>

                                <Link style={styles().links}
                                      to={'/detail/'+this.props.arrivalStation.BusStopCode}>
                                    <b>{this.props.arrivalStation.Description}</b>
                                    { getDistance(this.props.arrivalStation.distance)}
                                </Link>
                            </h4>
                        </div>
                        :
                        <div className="col-md-4">
                            <h1>{this.props.stationData.stationDesc.Description} </h1>
                            <h4>{this.props.stationData.stationDesc.RoadName}</h4>
                            <h4>#{this.props.stationData.BusStopID}</h4>
                        </div>
                }
                <div className="col-md-7">{
                    this.props.stationData.Services.length === 0
                        ? <h4 style={{opacity:0.4}}>No bus found</h4>
                        : (buildArrivalTab(this.props.stationData))}
                </div>
            </div>
        )


    }
});

BusStationArrival.propTypes = {
    stationData: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    arrivalStation: PropTypes.object,
    rank: PropTypes.number


};

module.exports = BusStationArrival;