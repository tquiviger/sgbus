var React = require('react');
var Link = require('react-router').Link;
var logo = require('file?name=[name].[ext]!../images/logo.png');

var styles = {
    container: {
        width: '100%',
        height: '100%',
        fontFamily: 'Raleway, sans-serif'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        background: '#21618C',
        color: '#fff'
    },
    image: {
        width: 40,
        align: 'middle'
    },
    icon: {
        marginRight: 3
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 600,
        margin:7
    }
};

var navBar = function () {
    return (<ul className="nav nav-tabs">
        <li role="presentation">
            <Link to={'/'}>
                <i style={styles.icon} className="fa fa-home"/>Home
            </Link>
        </li>
        <li role="presentation">
            <Link to={'/stats'}>
                <i style={styles.icon} className="fa fa-area-chart"/>Bus stats
            </Link>
        </li>
    </ul>)
}

var Main = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <Link to={'/'}>
                        <img src={logo} style={styles.image}/>
                    </Link>
                    <h2 style={styles.title}> Bus@Singapore</h2>
                </div>
                {navBar()}
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;