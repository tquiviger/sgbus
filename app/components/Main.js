var React = require('react');
var Link = require('react-router').Link;
var logo = require('file?name=[name].[ext]!../images/logo_large.png');
var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');

var styles = {
    body: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + backgroundImage + ')',
        minHeight: "100%",
        position: "relative",
        fontFamily: 'Open Sans, sans-serif'
    },
    main: {
        paddingBottom: "30px",
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        background: '#21618C',
        color: '#fff'
    },
    navBar: {
        background: '#FFF',
        color: '#fff'
    },
    footer: {
        height: "30px",
        position: "absolute",
        bottom: "0px",
        left: "0px",
        fontSize: 11,
        width: '100%',
        background: '#21618C',
        color: '#fff'
    },
    image: {
        width: 200,
        align: 'top'
    },
    icon: {
        marginRight: 3
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 600,
        margin: 7
    }
};

var navBar = function () {
    return (
        <div style={styles.navBar}><nav role="navigation" aria-label="Site Navigation">
            <ul className="nav nav-tabs">
                <li role="presentation">
                    <Link to={'/'}>
                        <i style={styles.icon} className="fa fa-home"/>Home
                    </Link>
                </li>
                <li role="presentation">
                    <Link to={'/stats'}>
                        <i style={styles.icon} className="fa fa-area-chart"/>Statistics
                    </Link>
                </li>
            </ul>
        </nav></div>)
};

var Main = React.createClass({
    render: function () {
        return (
            <div style={styles.body}>

                <div style={styles.container}>
                    <header>
                        <div style={styles.header}>
                            <Link to={'/'}>
                                <img src={logo} style={styles.image} alt="Main logo"/>
                            </Link>
                        </div>
                        {navBar()}
                    </header>
                    <div style={styles.main}>
                        {this.props.children}
                    </div>

                    <footer style={styles.footer}>
                        <span style={{padding:10}}>Copyright &copy; 2016 Thomas Quiviger, All Rights Reserved</span>
                    </footer>

                </div>
            </div>
        )
    }
});

module.exports = Main;