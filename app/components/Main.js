import React from 'react';
import Link from 'react-router/lib/Link'

require("../stylesheets/bootstrap.min.css");

var isClientMobile = require('../helpers/mobile').isClientMobile;
var logo = require('file?name=[name].[ext]!../images/logo_large.png');
var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');
var backgroundImageDesktop = require('file?name=[name].[ext]!../images/coverd.jpg');
var backgroundImageMobile = require('file?name=[name].[ext]!../images/coverm.jpg');

const THEME_COLOR = '#224A73';

var styles = function (bgImage) {
    return {
        body: {
            width: '100%',
            height: '100%'
        },
        container: {
            backgroundSize: 'cover',
            backgroundImage: 'url(' + bgImage + ')',
            minHeight: '100%',
            position: 'relative',
            fontFamily: 'Open Sans, sans-serif'
        },
        main: {
            paddingBottom: '30px',
            width: '100%'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            background: THEME_COLOR,
            color: '#fff'
        },
        navBar: {
            borderRadius: 0
        },
        navBarLinks: {
            color: THEME_COLOR,
            marginRight: 30
        },
        footer: {
            height: '30px',
            position: 'absolute',
            bottom: '0px',
            fontSize: 11,
            width: '100%',
            display: 'table',
            background: THEME_COLOR,
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
            fontWeight: 600,
            margin: 7,
            color: '#fff'
        }
    }
};

var navBar = isClientMobile() ? null : (
    <div>
        <nav style={styles().navBar} className="navbar navbar-light bg-faded" aria-label="Site Navigation">
            <div className="nav navbar-nav">
                <Link style={styles().navBarLinks} to={'/'}>
                    <i style={styles().icon} className="fa fa-home"/>Home
                </Link>
                <Link style={styles().navBarLinks} to={'/stats'}>
                    <i style={styles().icon} className="fa fa-area-chart"/>Statistics
                </Link>
            </div>
        </nav>
    </div>);

var Main = React.createClass({
    render: function () {
        var pattern = this.props.params.bus || this.props.params.busStation || this.props.params.arrivalStation
        var bgImage = pattern ? backgroundImage : (isClientMobile() ? backgroundImageMobile : backgroundImageDesktop)
        return (
            <div style={styles().body}>
                <div style={styles(bgImage).container}>
                    <header>
                        <div style={styles().header}>
                            <Link to={'/'}>
                                <img src={logo} style={styles().image} alt="Main logo"/>
                            </Link>
                        </div>
                        {navBar}
                    </header>
                    <div style={styles().main}>
                        {this.props.children}
                    </div>
                    <footer style={styles().footer}>
                        <span style={{padding:10,display:'table-cell',verticalAlign:'middle'}}>&copy; 2016 Thomas Quiviger, All Rights Reserved</span>
                    </footer>

                </div>
            </div>
        )
    }
});

module.exports = Main;