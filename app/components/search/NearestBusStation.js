var React = require('react');
var PropTypes = React.PropTypes;
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');

var styles = {
    image: {
        width: 40,
        align: 'middle'
    },
    icon: {
        marginRight: 5
    }
}

function Button(props) {
    return (
        <div>
            { props.nearestStationName === 'loading'
                ? <img src={loadingImage} style={styles.image}/>
                : <button type='button'
                          style={{margin: 10}}
                          className='btn btn-primary'
                          onClick={props.onSubmitNearestBusStation}>
                <span style={styles.icon} className='glyphicon glyphicon-globe'/>{props.nearestStationName}
            </button>
            }
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
    nearestStationName: PropTypes.string.isRequired
}

module.exports = NearestBusStation;