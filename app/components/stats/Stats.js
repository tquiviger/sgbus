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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
};


var Stats = React.createClass({

    render: function () {
        return (
            <div style={styles.container}>
                <canvas id="myChart" width="900" height="500"></canvas>
                <div className="form-group">
                    <input
                        className="form-control input-sm"
                        type="text"
                        placeholder="Enter a bus number"
                        onChange={this.props.callbackSelect}/>
                </div>

            </div>
        )
    }
});

Stats.propTypes = {
    busArray: PropTypes.array.isRequired,
    callbackSelect: PropTypes.func.isRequired
};

module.exports = Stats;