var React = require('react');
var PropTypes = React.PropTypes;

function Button(props) {
    return (
        <button type='button'
                style={{margin: 10}}
                className='btn btn-warning'
                onClick={props.onSubmitBusStation}>
            {props.busStationName}
        </button>
    )
}


function getStyles(props) {
    return {
        display: 'flex',
        flexDirection: props.direction || 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right'
    }
}

function GetBusStation(props) {
    return (
        <div style={getStyles(props)}>
            <Button
                onSubmitBusStation={props.onSubmitBusStation}
                busStationName={props.busStationName}>
            </Button>
        </div>
    )
}

GetBusStation.propTypes = {
    direction: PropTypes.string,
    onSubmitBusStation: PropTypes.func.isRequired,
    onUpdateBusStation: PropTypes.func.isRequired,
    busStation: PropTypes.string.isRequired,
    busStationName: PropTypes.string
}

module.exports = GetBusStation;