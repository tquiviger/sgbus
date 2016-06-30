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
        images: {
            width: 80,
            padding: 20,
            marginRight: 90,
            marginLeft: 90,
            marginTop: 10,
            borderRadius: '5px',
            boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            border: '1px solid #000'
        },
        caption: {
            fontWeight: 400,
            display: "block",
            textDecoration: "none",
            color: isClientMobile() ? '#fff' : '#f0ad4e'
        },
        icon: {
            marginRight: 3
        },
        mainTitle: {
            textAlign: 'center',
            width:"auto",
            padding: "20px ",
            margin:0,
            fontWeight: 700,
            fontSize: 70
        },
        mainTitleDiv: {
            color: '#fff',
            margin: "auto",
            width: "70%",
            background: "rgba(59, 84, 109,0.75)"
        }
    };
};


var Home = React.createClass({
    render: function () {
        var mainTitle = isClientMobile() ? null : <h3 style={styles().mainTitle}>Buses in Singapore</h3>;
        return (
            <div>
                <div style={styles().container}>
                    <div>
                        <Link to={'/stations'}>
                            <img src={busStopLogo} style={styles().images} alt="Bus station logo"/>
                        </Link>
                        <h3 style={styles().caption}><i style={styles().icon} className="fa fa-search"/>Station </h3>
                    </div>
                    <div>
                        <Link to={'/buses'}>
                            <img src={busLogo} style={styles().images} alt="Bus logo"/>
                        </Link>
                        <h3 style={styles().caption}><i style={styles().icon} className="fa fa-search"/>Bus</h3>
                    </div>
                    <div>
                        <Link to={'/itineraries'}>
                            <img src={itineraryLogo} style={styles().images} alt="Itinerary logo"/>
                        </Link>
                        <h3 style={styles().caption}><i style={styles().icon} className="fa fa-search"/>Itinerary </h3>
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