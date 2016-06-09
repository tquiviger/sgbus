var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var busLogo = require('file?name=[name].[ext]!../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../images/itineraryLogo.png');
var statsLogo = require('file?name=[name].[ext]!../images/statsLogo.png');

var styles = {
    container: {
        height: 'auto',
        padding: 30,
        textAlign: 'center'
    },
    images: {
        width: 80,
        padding: 10,
        borderRadius: '5px',
        boxShadow: '10px 10px 5px #888888',
        border: '3px solid #000'
    },
    mainIcon: {
        borderRadius: '5px',
        border: '3px solid'
    },
    caption: {
        display: "block",
        textDecoration: "none"
    },
    icon: {
        marginRight: 3
    }
};


var Home = React.createClass({
    render: function () {
        return (
            <div className="container-fluid" style={styles.container}>
                <div className="row">
                    <div className="col-xs-12 col-md-4" >
                        <Link to={'/buses'}>
                            <img src={busLogo} style={styles.images} alt="Bus logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Bus</h3>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <Link to={'/stations'}>
                            <img src={busStopLogo} style={styles.images} alt="Bus station logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Station
                        </h3>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <Link to={'/itineraries'}>
                            <img src={itineraryLogo} style={styles.images} alt="Itinerary logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Itinerary
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4"></div>
                    <div className="col-xs-12 col-md-3">
                        <Link to={'/stats'}>
                            <img src={statsLogo} style={styles.images} alt="Statistics logo"/>
                        </Link>
                        <h3 style={styles.caption}>Statistics</h3>
                    </div>
                    <div className="col-xs-12 col-md-4"></div>
                </div>
            </div>
        )
    }
});


module.exports = Home;