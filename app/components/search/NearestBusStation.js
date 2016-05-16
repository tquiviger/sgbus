var React = require('react');
var PropTypes = React.PropTypes;
var loadingImage = require('file?name=[name].[ext]!../../images/loading.svg');

var styles = {
    image: {
        width: 60,
        align: 'middle'
    },
    icon: {
        marginRight: 5
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right'
    }
};

function FindNearestButton(props) {
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



var NearestBusStation = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <FindNearestButton
                    onSubmitNearestBusStation={this.props.onSubmitNearestBusStation}
                    nearestStationName={this.props.nearestStationName}
                />
            </div>
        )
    }
});

NearestBusStation.propTypes = {
    onSubmitNearestBusStation: PropTypes.func.isRequired,
    nearestStationName: PropTypes.string.isRequired
};

module.exports = NearestBusStation;