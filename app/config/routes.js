var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var HomeContainer = require('../containers/HomeContainer');
var BusStationInfoContainer = require('../containers/busArrivals/BusStationInfoContainer');
var ItineraryContainer = require('../containers/itinerary/ItineraryContainer');
var BusRoutesContainer = require('../containers/busRoutes/BusRoutesContainer');


var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={HomeContainer}/>
            <Route path='detail/:busStation' component={BusStationInfoContainer}/>
            <Route path='routes/:bus' component={BusRoutesContainer}/>
            <Route path='itinerary/:departureStation' component={HomeContainer}/>
            <Route path='itinerary/:departureStation/:arrivalStation' component={ItineraryContainer}/>
        </Route>
    </Router>
);

module.exports = routes;