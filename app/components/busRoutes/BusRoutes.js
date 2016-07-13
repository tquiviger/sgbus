import React from 'react';
import {PropTypes} from 'react';
import Link from 'react-router/lib/Link'

var styles = {
    container: {
        height: '300px',
        fontSize: 11,
        overflowY: 'scroll',
        width: '100%'
    },
    table: {
        textAlign: 'left'
    },
    links: {
        color: '#000'
    },
    row: {
        marginTop:10,
        marginBottom:10
    },
    tabHeader: {
        color: "#FFF",
        background: "#21618C",
        fontWeight: 400
    },
    button: {
        fontWeight: 100,
        borderColor:'#fff',
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        outline: 'none',
        float: 'right'
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
                            <Link style={styles.links}
                                  to={'/stations/'+routes['BusStopCode_' + index]}><b>{routes['BusStopName_' + index]}</b></Link>
                        </td>
                        <td>{routes['Distance_' + index]} km</td>
                    </tr>
                );
            }
        }
        return rows;
    },
    render: function () {
        var toggleButon;
        if (this.props.busData.routes_2) {
            toggleButon =
                <button
                    type='button'
                    style={styles.button}
                    className='btn btn-primary btn-sm'
                    onClick={this.props.callbackFunction}>
                    <i style={{marginRight :10}} className="fa fa-exchange"/>
                    Switch direction
                </button>
        }
        return (
            <div  style={styles.container}>
                <div style={styles.row} className="col-sm-4">
                    <h2>Bus { this.props.busData.busInfo.ServiceNo} </h2>
                    <h5>Operator : <b>{ this.props.busData.busInfo.Operator}</b></h5>
                    <h5>Type : <b>{ this.props.busData.busInfo.Category} </b></h5>
                    <table className="table table-sm table-striped table-bordered">
                        <tbody>
                        <tr style={styles.tabHeader}>
                            <td colSpan="4" style={{textAlign:"center"}}>Scheduled bus frequency</td>
                        </tr>
                        <tr style={styles.tabHeader}>
                            <td>06:30 - 08:30</td>
                            <td>08:30 - 17:00</td>
                            <td>17:00 - 19:00</td>
                            <td>19:00 - 06:30</td>
                        </tr>
                        <tr>
                            <td>{this.props.busData.busInfo.AM_Peak_Freq} min</td>
                            <td>{this.props.busData.busInfo.AM_Offpeak_Freq} min</td>
                            <td>{this.props.busData.busInfo.PM_Peak_Freq} min</td>
                            <td>{this.props.busData.busInfo.PM_Offpeak_Freq} min</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={styles.table} className="col-sm-6">
                    <div className="container">
                        <div style={styles.row} className="row">
                            {toggleButon}
                            <h4><b>Direction {this.props.currentDirection}</b></h4>
                        </div>
                    </div>
                    <table className="table table-sm table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Road</th>
                            <th>Bus Stop</th>
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