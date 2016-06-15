var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    chartContainer: {
        width: '70%',
        marginBottom: 10,
        paddingBottom: 20
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
                    <div className="container-fluid">
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
    selectedBus: PropTypes.string
};

module.exports = Stats;