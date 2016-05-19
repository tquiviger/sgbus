var React = require('react');
var PropTypes = React.PropTypes;


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right'
    }
};


var BusStationResults = React.createClass({
    render: function () {
        var onClick = this.props.onSubmitBusStation
        return (
            <div style={styles.container}>
                {
                    this.props.busStations.hits.map(function (result) {
                            return (<button key={result._id}
                                            id={result._id}
                                            type='button'
                                            style={{margin: 9}}
                                            className='btn btn-info'
                                            onClick={onClick}
                            >
                                {result._source.Description}
                            </button>)
                        }
                    )}

            </div>
        )
    }
});

BusStationResults.propTypes = {
    onSubmitBusStation: PropTypes.func.isRequired,
    busStations: PropTypes.object.isRequired
};

module.exports = BusStationResults;