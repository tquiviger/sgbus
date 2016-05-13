var express = require('express');
var path = require('path');
var webpack = require('webpack');
var cors = require('cors')
var axios = require('axios');
var fs = require('fs');

var app = express();

var configurationFile = '/Users/thomas/sgbus/config.json';
var configuration = JSON.parse(fs.readFileSync(configurationFile));

var _baseBusArrivalsUrl = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?SST=True&BusStopID=';
var _baseBusStationsUrl = configuration.elasticSearchUrl + '/sgbus/bus_station/';


var static_path = path.join(__dirname, 'public');
var isDevelopment = (process.env.NODE_ENV !== 'production');

app.use(cors());

app.get('/api/bus_arrivals/:bus_stop_id', function (req, res) {
    axios.get(_baseBusArrivalsUrl + req.params.bus_stop_id, {
        headers: {
            AccountKey: configuration.AccountKey,
            UniqueUserID: configuration.UniqueUserID
        }
    })
         .then(function (response) {
            res.send(response.data)
         })
});


app.get('/api/bus_stations/:bus_stop_id', function (req, res) {
    axios.get(_baseBusStationsUrl + req.params.bus_stop_id)
        .then(function (response) {
            res.send(response.data)
        })
});



app.use(express.static(static_path))
    .get('/', function (req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    }).listen(process.env.PORT || 8080, function (err) {
    if (err) {
        console.log(err)
    }
    ;
    console.log('Listening at localhost:8080');
});

if (isDevelopment) {
    var config = require('./webpack.config');
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    }).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log('Listening at localhost:3000');
    });
}