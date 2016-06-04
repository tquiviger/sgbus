var React = require('react');
var moment = require('moment');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var ReactTooltip = require("react-tooltip");

var styles = function (isInOperation) {
    return {
        container: {
            fontSize: 16
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
        button: {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            outline: 'none'
        }
    }
};


function getIntervalAndLoad(status, date, load, feature, key) {
    var type = load === 'Seats Available' ? 'info' : (load === 'Standing Available' ? 'warning' : 'error');
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
        <td data-tip data-for={'loadAndFeatureTooltip'+key}>{interval}
            <ReactTooltip id={'loadAndFeatureTooltip'+key} type={type} effect="float">
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
        <table className="table table-condensed">
            <thead>
            <tr style={{textAlign:'center'}}>
                { mode === 'itinerary' ? <th></th> : null}
                <th>Status</th>
                <th>Bus #</th>
                <th>{ mode === 'itinerary' ? 'Distance' : 'Operator'}</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>1st Bus</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>2nd Bus</th>
                <th><i style={styles().icon} className="fa fa-clock-o"/>3rd Bus</th>
            </tr>
            </thead>
            <tbody>
            {services.map(function (result) {
                    var key = (arrivalStation ? arrivalStation.BusStopCode : result.OriginatingID) + '_' + result.ServiceNo;
                    return (
                        <tr key={key}
                            style={styles(result.Status === 'In Operation').row}>
                            {mode === 'itinerary' ? <td>
                                <button
                                    id={key}
                                    type='button btn-sm'
                                    style={styles().button}
                                    className='btn'
                                    onClick={callBackFunction}>
                                    <i className="fa fa-map"/>
                                </button>
                            </td> : null}
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
                    this.props.services.length === 0
                        ? <h4 style={{opacity:0.4}}>No bus found</h4>
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