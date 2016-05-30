var https = require('https');
var express = require('express');
var path = require('path');
var axios = require('axios');
var fs = require('fs');
var request = require('request');

var app = express();


var configPath = '/home/ec2-user/config/'
var configurationFile = configPath + 'config.json';
var configuration = JSON.parse(fs.readFileSync(configurationFile));

var _baseBusArrivalsUrl = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?SST=True&BusStopID=';

app.use('/search/*', function (req, res) {
    var url = configuration.elasticSearchUrl + '/' + req.params['0'];
    req.pipe(request(url)).pipe(res);
});


https.createServer(
    {
        key: fs.readFileSync(configPath + 'key.pem'),
        cert: fs.readFileSync(configPath + 'cert.pem')
    }, app)
    .listen(8080, function () {
        console.log("Express server listening on port " + 8080);
    });

//This endpoint cannot be managed by app/helpers/api due to CORS matters
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

app.use(express.static(path.join(__dirname, 'public')))
    .get('/', function (req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    });