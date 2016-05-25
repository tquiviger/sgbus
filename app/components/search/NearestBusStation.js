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
    var path = props.mode === 'station' ? '/detail/' : '/itinerary/';
    var nearestStationsButtons = props.nearestStations.map(function (result) {
        return (
            <Link to={path+result._id} key={result._id}>
                <button type='button'
                        key={result._id}
                        style={styles.button}
                        className='btn btn-primary'
                        value={props.nearestStationId}>
                    <i style={styles.icon} className="fa fa-map-marker" aria-hidden="true"/> {getStationNameAndDistance(result)}
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
                          onClick={props.onSubmitNearestBusStation}>
                <i style={styles.icon} className="fa fa-map-o" aria-hidden="true"/>Find the nearest stations
            </button>
            }
            <div style={styles.buttons}>{nearestStationsButtons}</div>
        </div>
    )
};


var NearestBusStation = React.createClass({
    render: function () {
        return (
            <FindNearestButton
                onSubmitNearestBusStation={this.props.onSubmitNearestBusStation}
                isLoading={this.props.isLoading}
                mode={this.props.mode}
                nearestStations={this.props.nearestStations}
            />
        )
    }
});

NearestBusStation.propTypes = {
    onSubmitNearestBusStation: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nearestStations: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired
};

module.exports = NearestBusStation;