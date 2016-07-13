import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';

var Main = require('../components/Main');
var HomeContainer = require('../containers/HomeContainer');
var BusStationInfoContainer = require('../containers/busArrivals/BusStationInfoContainer');
var ItineraryContainer = require('../containers/itinerary/ItineraryContainer');
var BusRoutesContainer = require('../containers/busRoutes/BusRoutesContainer');
var StatsContainer = require('../containers/stats/StatsContainer');
var SearchMainContainer = require('../containers/search/SearchMainContainer');


var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={HomeContainer}/>
            <Route path='stats' component={StatsContainer}/>
            <Route path='stations' component={SearchMainContainer}/>
            <Route path='stations/:busStation' component={BusStationInfoContainer}/>
            <Route path='buses' component={SearchMainContainer}/>
            <Route path='buses/:bus' component={BusRoutesContainer}/>
            <Route path='itineraries' component={SearchMainContainer}/>
            <Route path='itineraries/:departureStation' component={SearchMainContainer}/>
            <Route path='itineraries/:departureStation/:arrivalStation' component={ItineraryContainer}/>
        </Route>
    </Router>
);

module.exports = routes;