var React = require('react');
var PropTypes = React.PropTypes;
var SearchBusContainer = require('../containers/SearchBusContainer');
var backgroundImage = require('file?name=[name].[ext]!../images/pattern.svg');

var styles = {
  container: {
    backgroundSize: 'cover',
    backgroundImage: 'url('+backgroundImage+')',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  header: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 100,
  }
}

function Home (props) {
  return (
    <div style={styles.container}>
        <SearchBusContainer/>
    </div>
  )
}

module.exports = Home;