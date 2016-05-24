var React = require('react');
var Link = require('react-router').Link;
var logo = require('file?name=[name].[ext]!../images/logo.png');

var styles = {
    container: {
        width: '100%',
        height: '92%',
        fontFamily: 'Open Sans, sans-serif'
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
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 100,
        margin:7
    }
};

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
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;