var React = require('react');
var PropTypes = React.PropTypes;
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var Link = require('react-router').Link;

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right',
        align: 'middle'
    },
    buttons: {
        display: 'flex',
        align: 'middle',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 10
    },
    image: {
        width: 60

    },
    icon: {
        marginRight: 5
    }
};

function getStationNameAndDistance(stationData) {
    return stationData._source.Description
        + ' ('
        + Math.round(Number(stationData.sort[0]))
        + ' meters)'
}

var FindNearestButton = function (props) {
    var path = props.mode === 'stations' ? '/stations/' : '/itineraries/';
    var nearestStationsButtons = props.nearestStations.map(function (result) {
        var itinerayPath = props.mode == 'itineraries2' ? result._id + '/' + props.originalArrivalStation._id : result._id
        return (
            <Link to={path+itinerayPath} key={result._id}>
                <button type='button'
                        key={result._id}
                        style={styles.button}
                        className='btn btn-primary'
                        value={props.nearestStationId}>
                    <i style={styles.icon} className="fa fa-map-marker"/> {getStationNameAndDistance(result)}
                </button>
            </Link>
        )
    });

    return (
        <div style={styles.container}>
            { props.isLoading
                ? <img src={loadingImage} style={styles.image}/>
                : <button type='button'
                          style={styles.button}
                          className='btn btn-warning'
                          onClick={props.callbackFunction}>
                <i style={styles.icon} className="fa fa-map-o"/>{props.text}
            </button>
            }
            <div style={styles.buttons}>{nearestStationsButtons}</div>
        </div>
    )
};


var NearestBusStation = React.createClass({
    render: function () {
        return (
            <FindNearestButton {...this.props}/>
        )
    }
});

NearestBusStation.propTypes = {
    callbackFunction: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nearestStations: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    originalArrivalStation: PropTypes.object
};

module.exports = NearestBusStation;