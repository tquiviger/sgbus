var React = require('react');
var PropTypes = React.PropTypes;
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');
var one = require('file?name=[name].[ext]!../../images/one.png');
var two = require('file?name=[name].[ext]!../../images/two.png');
var three = require('file?name=[name].[ext]!../../images/three.png');
var NearestStationsMap = require('./NearestStationsMap');
var Link = require('react-router').Link;

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'right',
        height: '100%'
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

function getStationNameAndDistance(stationData, rank) {
    return stationData._source.Description
        + ' ('
        + Math.round(Number(stationData.sort[0]))
        + ' meters)'
}

var FindNearestButton = function (props) {
    var nearestStationsButtons = props.nearestStations.map(function (result, rank) {
        var path = props.mode === 'stations' ? '/stations' : '/itineraries';
        path = props.mode === 'itineraries2' ? props.currentPath + '/' + result._id : path + '/' + result._id;
        var numberLogo;
        switch (rank) {
            case 0:
                numberLogo = one;
                break;
            case 1:
                numberLogo = two;
                break;
            case 2:
                numberLogo = three;
        }
        return (

            <Link to={path} key={result._id}>
                <button type='button'
                        key={result._id}
                        style={styles.button}
                        className='btn btn-primary'
                        value={props.nearestStationId}>
                    <img style={{width:16,height:16, marginRight:5}} src={numberLogo}/>
                    <span style={{verticalAlign: 'middle'}}>{getStationNameAndDistance(result, rank)}</span>
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
            {props.nearestStations.length == 0
                ? null
                : <NearestStationsMap {...props}/>}
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
    userCoord: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    originalArrivalStation: PropTypes.object
};

module.exports = NearestBusStation;