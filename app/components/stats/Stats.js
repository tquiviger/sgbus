import React from 'react';
import {PropTypes} from 'react';

var styles = {
    chartContainer: {
        width: '70%',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        paddingBottom: 20,
        borderRadius: '5px',
        background: "rgba(231, 240, 249,0.8)"
    },
    form: {
        width: '20%',
        textAlign: 'center'
    }
};


var Stats = React.createClass({
    render: function () {
        return (
            <div className="container" style={styles.chartContainer}>
                <h3>Stats for <b>{this.props.selectedBus ? 'Bus ' + this.props.selectedBus : 'all buses'}</b>
                </h3>
                <canvas id="waitingTime"/>
                <div style={styles.form} className="container">
                    <div className="form-group">
                        <input
                            className="form-control input-sm"
                            type="text"
                            placeholder="Enter a bus #"
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