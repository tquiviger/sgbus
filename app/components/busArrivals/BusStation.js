var React = require('react');
var Detail = require('./Detail');
var StationMap = require('./StationMap');
var PropTypes = React.PropTypes;

var styles = {
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
}

function BusStation(props) {

    return (
        <div style={styles.descriptionContainer}>
            {
                props.isLoading === true
                    ? <h1 style={styles.header}> Loading </h1>
                    : <StationMap stationData={props.stationData}/>
            }
            {
                props.isLoading === true
                    ? ''
                    : <Detail stationData={props.stationData}/>
            }

        </div>
    )
}

BusStation.propTypes = {
    stationData: PropTypes.object.isRequired
}


module.exports = BusStation;