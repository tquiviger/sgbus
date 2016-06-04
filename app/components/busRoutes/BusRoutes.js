var React = require('react');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var ToggleButton = require('../_common/ToggleButton');


var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '60%',
        fontSize: 14,
        overflowY: 'scroll',
        width: '100%'
    },
    table: {
        textAlign: 'left'
    }
};


var BusRoutes = React.createClass({
    getRoutes: function (routes, direction) {
        routes = direction === '1' ? routes.routes_1 : routes.routes_2;
        var rows = [];
        for (var i = 1; i < 110; i++) {
            var index = (i < 10) ? '0' + i : i;
            if (routes['BusStopRoad_' + index] != null) {
                rows.push(
                    <tr key={'BusStopRoad_'+index}
                        id={index+'_'+direction+'|'+routes['Latitude_' + index]+'|'+routes['Longitude_' + index]}
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
        return rows;
    }, render: function () {

        return (
            <div className="row" style={styles.container}>
                <div className="col-md-4">
                    <h1>Bus { this.props.busData.busInfo.ServiceNo} </h1>
                    <h4>Operator : <b>{ this.props.busData.busInfo.Operator}</b></h4>
                    <h4>Type : <b>{ this.props.busData.busInfo.Category} </b></h4>

                </div>
                <div style={styles.table} className="col-md-7">
                    <div className="container-fluid">
                        <ToggleButton
                            additionalStyle={{float: 'right'}}
                            text={"Switch direction"}
                            buttonCallback={this.props.callbackFunction}/>

                       <h3><b>Direction {this.props.currentDirection}</b></h3>
                    </div>
                    <table className="table table-condensed table-hover">
                        <thead>
                        <tr>
                            <th>Stop #</th>
                            <th>Road Name</th>
                            <th>Bus Stop Name</th>
                            <th>Distance</th>
                        </tr>
                        </thead>
                        <tbody>{this.getRoutes(this.props.busData, this.props.currentDirection)}</tbody>
                    </table>
                </div>
            </div>
        )
    }

});

BusRoutes.propTypes = {
    busData: PropTypes.object.isRequired,
    onHoverStation: PropTypes.func.isRequired,
    callbackFunction: PropTypes.func.isRequired,
    currentDirection: PropTypes.string.isRequired
};

module.exports = BusRoutes;