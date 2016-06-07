var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var backgroundImageBlue = require('file?name=[name].[ext]!../../images/pattern-buses.svg');

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImageBlue + ')',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%'
    },
    chartContainer: {
        height: '70%',
        width: '70%',
        marginBottom:10,
        paddingBottom:20
    }
};


var Stats = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <h3>Bus <b>{this.props.selectedBus}</b> Stats</h3>
                <div className="container-fluid" style={styles.chartContainer}>
                    <canvas id="waitingTime"/>
                </div>
                <div className="container-fluid" >
                    <div className="form-group">
                        <input
                            className="form-control input-sm"
                            type="text"
                            placeholder="Enter a bus number"
                            onChange={this.props.callbackFunction}/>
                    </div>
                </div>

            </div>
        )
    }
});

Stats.propTypes = {
    callbackFunction: PropTypes.func.isRequired,
    selectedBus:PropTypes.string
};

module.exports = Stats;