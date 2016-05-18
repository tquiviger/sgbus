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
        alignSelf: 'right'
    },
    buttons: {
        display: 'flex',
        align: 'middle',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        align: 'middle',
        margin: 10
    },
    image: {
        width: 60,
        align: 'middle'
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
};

function FindNearestButton(props) {
    var buttons = props.nearestStations.map(function (result) {
        return (
            <Link to={'/detail/'+result._id} key={result._id}>
                <button type='button'
                        key={result._id}
                        style={styles.button}
                        className='btn btn-primary'
                        value={props.nearestStationId}>
                    <span style={styles.icon} className='glyphicon glyphicon-globe'/>{getStationNameAndDistance(result)}
                </button>
            </Link>
        )
    })

    return (
        <div style={styles.container}>
            { props.buttonText === 'loading'
                ? <img src={loadingImage} style={styles.image}/>
                : <button type='button'
                          style={styles.button}
                          className='btn btn-warning'
                          onClick={props.onSubmitNearestBusStation}>
                <span style={styles.icon} className='glyphicon glyphicon-globe'/>{props.buttonText}
            </button>
            }

            <div style={styles.buttons}>{buttons}</div>
        </div>
    )
}


var NearestBusStation = React.createClass({
    render: function () {
        return (
            <FindNearestButton
                onSubmitNearestBusStation={this.props.onSubmitNearestBusStation}
                buttonText={this.props.buttonText}
                nearestStations={this.props.nearestStations}
            />
        )
    }
});

NearestBusStation.propTypes = {
    onSubmitNearestBusStation: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    nearestStations: PropTypes.array.isRequired
};

module.exports = NearestBusStation;