var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var ReactTooltip = require("react-tooltip");

var styles = function (isInOperation) {
    return {
        container: {
            fontSize: 12
        },
        icon: {
            marginRight: 3
        },
        links: {
            color: '#000'
        },
        row: {
            opacity: isInOperation ? 1 : 0.3
        },
        mapButton: {
            cursor: "pointer"
        }
    }
};


function getIntervalAndLoad(status, date, load, feature, key) {
    var loadStyle = load === 'Seats Available' ? {
        type: 'info', borderStyle: {}
    } : (load === 'Standing Available' ? {
            type: 'warning', borderStyle: {borderBottom: "4px solid #F0AD4E"}
        } : {
            type: 'error', borderStyle: {borderBottom: "4px solid #BE6464"}
        }
    );
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
    return (
        <td data-tip data-for={'loadAndFeatureTooltip'+key}>
            <span style={loadStyle.borderStyle}>{interval}</span>
            <ReactTooltip id={'loadAndFeatureTooltip'+key} type={loadStyle.type} effect="float">
                <span>{load}</span>
                <br/>
                <span><i style={styles().icon} className="fa fa-wheelchair-alt"/>: {feature ? 'Yes' : 'No'}</span>
            </ReactTooltip>
        </td>
    )
}

function getDistance(distance) {
    return distance === 0 ? '' : ' (' + Math.round(Number(distance)) + ' meters)'
}

function buildArrivalTab(services, mode, arrivalStation, callBackFunction) {
    return (
        <table className="table table-sm">
            <thead>
            <tr style={{textAlign:'center'}}>
                <th>{ mode === 'itinerary' ? "Map" : ""}</th>
                <th>Bus #</th>
                <th>{ mode === 'itinerary' ? 'Distance' : 'Operator'}</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>1st</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>2nd</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>3rd</th>
            </tr>
            </thead>
            <tbody>
            {services.map(function (result) {
                    var key = (arrivalStation ? arrivalStation.BusStopCode : result.OriginatingID) + '_' + result.ServiceNo;
                    return (
                        <tr key={key} style={styles(result.Status === 'In Operation').row}>
                            <td>{mode === 'station' ?
                                result.Status === 'In Operation'
                                    ? <i className="fa fa-check-circle"/>
                                    : <i className="fa fa-times-circle"/>
                                : <span id={key}
                                        style={styles().mapButton}
                                        onClick={callBackFunction}>
                                    <i className="fa fa-map"/>
                                </span>
                            }
                            </td>
                            <td>
                                <Link style={styles().links} to={'/buses/'+result.ServiceNo}>
                                    <strong>Bus {result.ServiceNo}</strong>
                                </Link>
                            </td>
                            <td>{ mode === 'itinerary' ? result.numStops + ' stops / ' + result.routeDistance + ' km' : result.Operator}</td>
                            {getIntervalAndLoad(result.Status, result.NextBus.EstimatedArrival, result.NextBus.Load, result.NextBus.Feature, key + '1')}
                            {getIntervalAndLoad(result.Status, result.SubsequentBus.EstimatedArrival, result.SubsequentBus.Load, result.SubsequentBus.Feature, key + '2')}
                            {getIntervalAndLoad(result.Status, result.SubsequentBus3.EstimatedArrival, result.SubsequentBus3.Load, result.SubsequentBus3.Feature, key + '3')}
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
                        <div className="col-sm-3">
                            <h5>
                                <b>{this.props.rank} </b>
                                <i style={styles().icon} className="fa fa-arrow-circle-right"/>
                                <Link style={styles().links}
                                      to={'/stations/'+this.props.arrivalStation.BusStopCode}>
                                    <b>{this.props.arrivalStation.Description}</b>
                                    { getDistance(this.props.arrivalStation.distance)}
                                </Link>
                            </h5>
                        </div>
                        :
                        <div className="col-sm-3">
                            <h1>{this.props.stationData.stationDesc.Description} </h1>
                            <h4>{this.props.stationData.stationDesc.RoadName}</h4>
                            <h4>#{this.props.stationData.BusStopID}</h4>
                        </div>
                }
                <div className="col-sm-6">{
                    this.props.services.length === 0
                        ? <h5 style={{opacity:0.4}}>No bus found</h5>
                        : (buildArrivalTab(this.props.services, this.props.mode, this.props.arrivalStation, this.props.callbackFunction))}
                </div>
            </div>
        )


    }
});

BusStationArrival.propTypes = {
    stationData: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    arrivalStation: PropTypes.object,
    rank: PropTypes.number,
    callbackFunction: PropTypes.func
};

module.exports = BusStationArrival;