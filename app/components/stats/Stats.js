var React = require('react');
var Config = require('Config');
var PropTypes = React.PropTypes;
var backgroundImageBlue = require('file?name=[name].[ext]!../../images/pattern.svg');

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
        marginBottom:50
    }
};


var Stats = React.createClass({

    render: function () {
        return (
            <div style={styles.container}>
                <div className="container-fluid" style={styles.chartContainer}>
                    <canvas id="meanWaitingTime"/>
                </div>
                <div className="container-fluid" >
                    <div className="form-group">
                        <input
                            className="form-control input-sm"
                            type="text"
                            placeholder="Enter a bus number"
                            onChange={this.props.callbackSelect}/>
                    </div>
                </div>

            </div>
        )
    }
});

Stats.propTypes = {
    callbackSelect: PropTypes.func.isRequired
};

module.exports = Stats;