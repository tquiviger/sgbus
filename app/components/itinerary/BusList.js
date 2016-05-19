var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var styles = {
    container: {
        fontWeight: 100,
        height: '70%',
        width: '100%'
    },
    table: {
        fontSize: 17,
        height: '70%',
        overflow: 'scroll',
        textAlign: 'center'
    }
};

var BusList = React.createClass({
    render: function () {
        var buses = this.props.buses;

        return <div style={styles.container}>
            <div className="col-md-5">
                <h2>Available buses</h2>
                <h4>From {buses.departureStation.Description} </h4>
                <h4>To {buses.arrivalStation.Description}</h4>
            </div>

            <div style={styles.table} className="col-md-6">
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Bus #</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        buses.hits.hits.map(function (result) {
                            return (
                                <tr key={result._id}>
                                    <td><Link to={'/routes/'+result._id}> {result._id}</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    }
});

BusList.propTypes = {
    buses: PropTypes.object.isRequired
};

module.exports = BusList;