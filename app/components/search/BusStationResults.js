var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};


var BusStationResults = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                {
                    this.props.busStations.hits.map(function (result) {
                            return (
                                <Link key={result._id} to={'/detail/'+result._id}>
                                    <button
                                        type='button'
                                        style={{margin: 9}}
                                        className='btn btn-info'>
                                        {result._source.Description}
                                    </button>
                                </Link>
                            )
                        }
                    )}

            </div>
        )
    }
});

BusStationResults.propTypes = {
    busStations: PropTypes.object.isRequired
};

module.exports = BusStationResults;