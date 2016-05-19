var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var styles = {
        table: {
            fontSize: 20,
            height: '70%',
            width: '70%',
            overflow: 'scroll',
            textAlign: 'left'
        }
};

var BusList = React.createClass({
    render: function () {
        return <div>
            <div style={styles.table} className="col-md-8">
                <table className="table table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>Bus #</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.buses.map(function (result) {
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
    buses: PropTypes.array.isRequired
};

module.exports = BusList;