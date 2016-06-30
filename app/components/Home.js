var React = require('react');
var Link = require('react-router').Link;

var isClientMobile = require('../helpers/mobile').isClientMobile;

var busLogo = require('file?name=[name].[ext]!../images/busLogo.png');
var busStopLogo = require('file?name=[name].[ext]!../images/busStopLogo.png');
var itineraryLogo = require('file?name=[name].[ext]!../images/itineraryLogo.png');


var styles = function () {
    return {
        container: {
            padding: 30,
            height: 'auto',
            textAlign: 'center',
            display: 'flex',
            align: 'middle',
            flexDirection: isClientMobile() ? 'column' : 'row',
            justifyContent: 'center'
        },
        container2: {
            display: 'flex',
            align: 'middle',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        images: {
            width: 80,
            padding: 20,
            marginRight: isClientMobile() ? 10 : 90,
            marginLeft: isClientMobile() ? 10 : 90,
            marginTop: isClientMobile() ? 30 : 10,
            borderRadius: '5px',
            boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            border: '1px solid #000',
            background: 'rgba(208, 209, 211,0.75)'
        },
        caption: {
            fontWeight: 700,
            display: 'block',
            textDecoration: 'none',
            color: '#f0ad4e'
        },
        mainTitle: {
            textAlign: 'center',
            padding: '20px',
            margin: 0,
            fontWeight: 700,
            fontSize: 70
        },
        mainTitleDiv: {
            borderRadius: '5px',
            color: '#fff',
            margin: 'auto',
            marginTop: 50,
            width: '70%',
            background: 'rgba(34, 74, 115,0.5)'
        }
    };
};


var Home = React.createClass({
    render: function () {
        var mainTitle = isClientMobile() ? null : <h3 style={styles().mainTitle}>Buses in Singapore</h3>;
        return (
            <div>
                <div style={styles().container}>
                    <div style={styles().container2}>
                        <div>
                            <Link to={'/stations'}>
                                <img src={busStopLogo} style={styles().images} alt="Bus station logo"/>
                            </Link>
                            <h3 style={styles().caption}>Station</h3>
                        </div>
                        <div>
                            <Link to={'/buses'}>
                                <img src={busLogo} style={styles().images} alt="Bus logo"/>
                            </Link>
                            <h3 style={styles().caption}>Bus</h3>
                        </div>
                    </div>
                    <div>
                        <Link to={'/itineraries'}>
                            <img src={itineraryLogo} style={styles().images} alt="Itinerary logo"/>
                        </Link>
                        <h3 style={styles().caption}>Itinerary </h3>
                    </div>

                </div>
                <div style={styles().mainTitleDiv}>
                    {mainTitle}
                </div>
            </div>
        )
    }
});


module.exports = Home;