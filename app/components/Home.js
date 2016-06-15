var React = require('react');
var Link = require('react-router').Link;

var busLogo = require('file?name=[name].[ext]!../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../images/itineraryLogo.png');
var statsLogo = require('file?name=[name].[ext]!../images/statsLogo.png');

var styles = {
    container: {
        padding: 30,
        height: 'auto',
        textAlign: 'center',
        display: 'flex',
        align: 'middle',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: 80,
        padding: 20,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 10,
        borderRadius: '5px',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        border: '1px solid #000'
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
            <div style={styles.container}>
                <div>

                    <div >
                        <Link to={'/stations'}>
                            <img src={busStopLogo} style={styles.images} alt="Bus station logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Station </h3>
                    </div>
                    <div>
                        <Link to={'/buses'}>
                            <img src={busLogo} style={styles.images} alt="Bus logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Bus</h3>

                    </div>

                </div>
                <div>
                    <div>
                        <Link to={'/itineraries'}>
                            <img src={itineraryLogo} style={styles.images} alt="Itinerary logo"/>
                        </Link>
                        <h3 style={styles.caption}><i style={styles.icon} className="fa fa-search"/>Itinerary </h3>
                    </div>

                    <div>
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