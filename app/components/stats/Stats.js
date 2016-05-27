var React = require('react');
var Config = require('Config');
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
                <canvas id="myChart" width="600" height="400"></canvas>
            </div>
        )
    }
});


module.exports = Stats;