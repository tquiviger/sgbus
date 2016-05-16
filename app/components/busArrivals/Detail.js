var React = require('react');
var moment = require('moment');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        fontWeight: 100,
        height: '71%',
        width: '100%'
    },
    table: {
        fontSize: 20,
        height: '70%',
        overflow: 'scroll',
        textAlign: 'left'
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
        interval = moment(date).fromNow(true);
        if (interval === 'a few seconds') {
            interval = <b>Arrived</b>
        }
    }
    return (
        <td>
            <span style={styles.icon} className="glyphicon glyphicon-time"/>
            <span>{interval}</span>
        </td>
    )
}


var Detail = React.createClass({
    render: function () {
        var stationData = this.props.stationData;
        return (
            <div className="row" style={styles.container}>
                <div className="col-md-4">
                    <h1>{stationData.stationDesc.Description} </h1>
                    <h4>{stationData.stationDesc.RoadName}</h4>
                    <h4>#{stationData.BusStopID}</h4>
                </div>
                <div style={styles.table} className="col-md-8">
                    <table className="table table-condensed">
                        <tbody>
                        {stationData.Services.map(function (result) {
                            return (
                                <tr key={result.OriginatingID+result.ServiceNo}>
                                    <td>
                                        { result.Status === 'In Operation'
                                            ? <span className="glyphicon glyphicon-ok-circle"/>
                                            : <span className="glyphicon glyphicon-ban-circle"/>
                                        }
                                    </td>
                                    <td>Bus {result.ServiceNo}</td>
                                    <td>{result.Operator}</td>
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

Detail.propTypes = {
    stationData: PropTypes.object.isRequired
};

module.exports = Detail;