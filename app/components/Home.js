var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var backgroundImageBlue = require('file?name=[name].[ext]!../images/pattern.svg');
var busLogo = require('file?name=[name].[ext]!../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../images/itineraryLogo.png');

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImageBlue + ')',
        height: '100%',
        width: '100%'
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
        width: 150,
        paddingLeft: 100,
        paddingTop: 100,
        paddingRight: 100,
        paddingBottom: 50
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
                            <img src={busLogo} style={styles.images}/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Bus</h3>
                    </div>
                    <div style={styles.mainIcon}>
                        <Link to={'/stations'}>
                            <img src={busStopLogo} style={styles.images}/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Station</h3>
                    </div>
                    <div style={styles.mainIcon}>
                        <Link to={'/itineraries'}>
                            <img src={itineraryLogo} style={styles.images}/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Itinerary</h3>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = Home;