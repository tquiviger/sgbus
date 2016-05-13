var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../containers/Main');
var HomeContainer = require('../containers/HomeContainer');
var BusStationInfoContainer = require('../containers/BusStationInfoContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={HomeContainer} />
      <Route path='detail/:busStation' component={BusStationInfoContainer} />
    </Route>
  </Router>
);

module.exports = routes;