var React = require('react');
var backgroundImage = require('file?name=[name].[ext]!../../images/pattern.svg');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100
    },
    table: {
        fontSize: 10,
        height: '70%',
        overflow: 'scroll',
        textAlign: 'left'
    },
};


var BusRoutes = React.createClass({
    render: function () {
        var routes = this.props.busData._source;
        var rows = [];
        for (var i = 0; i < 110; i++) {
            var index = i < 10 ? '0' + i : i
            if (routes['BusStopRoad.' + index] != null) {
                rows.push(
                    <tr key={'BusStopRoad.'+index}>
                        <td>{routes['BusStopRoad.' + index]}</td>
                        <td>{index}</td>
                        <td>
                            <Link to={'/detail/'+routes['BusStopCode.' + index]}>{routes['BusStopName.' + index]}</Link>
                        </td>
                        <td>{routes['Distance.' + index]}</td>
                    </tr>
                );
            }

        }

        return (
            <div style={styles.container}>
                <h1>Bus { this.props.bus} </h1>
                <div style={styles.table} className="col-md-8">
                    <table className="table table-condensed">
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        )
    }

});

BusRoutes.propTypes = {
    bus: PropTypes.string.isRequired,
    busData: PropTypes.object.isRequired
};

module.exports = BusRoutes;