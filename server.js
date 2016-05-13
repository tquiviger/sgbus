var https = require('https');
var express = require('express');
var path = require('path');
var cors = require('cors')
var axios = require('axios');
var fs = require('fs');

var app = express();

var configurationFile = '/home/ec2-user/config/config.json';
var configuration = JSON.parse(fs.readFileSync(configurationFile));

var _baseBusArrivalsUrl = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?SST=True&BusStopID=';
var _baseBusStationsUrl = configuration.elasticSearchUrl + '/sgbus/bus_station/';

var static_path = path.join(__dirname, 'public');

app.use(cors());

https.createServer({
      key: fs.readFileSync('/home/ec2-user/config/key.pem'),
      cert: fs.readFileSync('/home/ec2-user/config/cert.pem')
    }, app).listen(8080, function(){
                          console.log("Express server listening on port " + 8080);
                        });

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
});