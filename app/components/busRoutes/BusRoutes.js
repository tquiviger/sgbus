var React = require('react');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;


var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '50%',
        fontSize: 17,
        width: '100%'
    },
    table: {
        height: '100%',
        overflow: 'scroll',
        textAlign: 'left'
    }
};


var BusRoutes = React.createClass({
    render: function () {
        var routes = this.props.busData._source;
        var rows = [];
        for (var i = 0; i < 110; i++) {
            var index = (i < 10) ? '0' + i : i;
            if (routes['BusStopRoad_' + index] != null) {
                rows.push(
                    <tr key={'BusStopRoad_'+index}
                        id={index+'|'+routes['Latitude_' + index]+'|'+routes['Longitude_' + index]}
                        onMouseOver={this.props.onHoverStation}>
                        <td>{index}</td>
                        <td>{routes['BusStopRoad_' + index]}</td>
                        <td>
                            <Link to={'/detail/'+routes['BusStopCode_' + index]}><b>{routes['BusStopName_' + index]}</b></Link>
                        </td>
                        <td>{routes['Distance_' + index]} km</td>
                    </tr>
                );
            }
        }

        return (
            <div className="row" style={styles.container}>
                <div className="col-md-4">
                    <h1>Bus { this.props.busData.busInfo.ServiceNo} </h1>
                    <h4>Operator : <b>{ this.props.busData.busInfo.Operator}</b></h4>
                    <h4>Type : <b>{ this.props.busData.busInfo.Category} </b></h4>
                </div>
                <div style={styles.table} className="col-md-7">
                    <table className="table table-condensed table-hover">
                        <thead>
                        <tr>
                            <th>Bus Stop #</th>
                            <th>Road Name</th>
                            <th>Bus Stop Name</th>
                            <th>Distance</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        )
    }

});

BusRoutes.propTypes = {
    busData: PropTypes.object.isRequired,
    onHoverStation: PropTypes.func.isRequired
};

module.exports = BusRoutes;