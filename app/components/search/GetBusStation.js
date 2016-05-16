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


function Button(props) {
    return (
        <button type='button'
                style={{margin: 9}}
                className='btn btn-warning'
                onClick={props.onSubmitBusStation}>
            {props.busStationName}
        </button>
    )
}

var GetBusStation = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <Button
                    onSubmitBusStation={this.props.onSubmitBusStation}
                    busStationName={this.props.busStationName}>
                </Button>
            </div>
        )
    }
});

GetBusStation.propTypes = {
    direction: PropTypes.string,
    onSubmitBusStation: PropTypes.func.isRequired,
    onUpdateBusStation: PropTypes.func.isRequired,
    busStation: PropTypes.string.isRequired,
    busStationName: PropTypes.string
};

module.exports = GetBusStation;