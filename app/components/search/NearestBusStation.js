var React = require('react');
var PropTypes = React.PropTypes;

function Button(props) {
    return (
        <div>
               <button type='button'
                       style={{margin: 10}}
                       className='btn btn-primary'
                       onClick={props.onSubmitNearestBusStation}>
                   <span className='glyphicon glyphicon-globe'/>{props.nearestStationName}
               </button>
       </div>
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

function NearestBusStation(props) {
    return (
        <div style={getStyles(props)}>
            <Button
                onSubmitNearestBusStation={props.onSubmitNearestBusStation}
                nearestStationName={props.nearestStationName}
                />
        </div>
    )
}

NearestBusStation.propTypes = {
    onSubmitNearestBusStation: PropTypes.func.isRequired,
}

module.exports = NearestBusStation;