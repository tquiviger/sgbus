var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');
var busLogo = require('file?name=[name].[ext]!../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../images/itineraryLogo.png');
var statsLogo = require('file?name=[name].[ext]!../images/statsLogo.png');

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        height: '100%',
        width: '100%',
        textAlign: 'center'
    },
    mainIcons: {
        display: 'flex',
        align: 'middle',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainIcon: {
        verticalAlign: "top",
        textAlign: "center",
        display: "inline-block",
        textDecoration: "none"

    },
    images: {
        width: 100,
        paddingLeft: 100,
        paddingTop: 100,
        paddingRight: 100,
        paddingBottom: 10
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
            <div style={styles.container}>
                    <div style={styles.mainIcons}>
                        <div style={styles.mainIcon}>
                            <Link to={'/buses'}>
                                <img src={busLogo} style={styles.images} alt="Bus logo"/>
                            </Link>
                            <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Bus</h3>
                        </div>
                        <div style={styles.mainIcon}>
                            <Link to={'/stations'}>
                                <img src={busStopLogo} style={styles.images} alt="Bus station logo"/>
                            </Link>
                            <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Station</h3>
                        </div>
                        <div style={styles.mainIcon}>
                            <Link to={'/itineraries'}>
                                <img src={itineraryLogo} style={styles.images} alt="Itinerary logo"/>
                            </Link>
                            <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Itinerary</h3>
                        </div>
                    </div>
                    <div style={styles.mainIcons}>
                        <div style={styles.mainIcon}>
                            <Link to={'/stats'}>
                                <img src={statsLogo} style={styles.images} alt="Statistics logo"/>
                            </Link>
                            <h3 style={styles.caption}>Statistics</h3>
                        </div>

                    </div>
            </div>
        )
    }
});


module.exports = Home;