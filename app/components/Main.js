var React = require('react');
var Link = require('react-router').Link;
var logo = require('file?name=[name].[ext]!../images/logo.png');

var styles = {
    container: {
        width: '100%',
        height: '92%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        background: '#21618C',
        color: '#fff',
        padding: 5
    },
    image: {
        width: 40,
        align: 'middle'
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
                    <h2 style={{margin:7}}> Bus@Singapore</h2>

                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;