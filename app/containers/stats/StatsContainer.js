var React = require('react');
var moment = require('moment');
var Chart = require('chart.js');
var _ = require('underscore');
var randomColor = require('randomcolor');

var Stats = require('../../components/stats/Stats');
var getLatestsStats = require('../../helpers/api').getLatestsStats;
var chartOptions = require('./chartOptions/chartOptions');

const BUSES = require('../../data/busData').BUSES;
const OUTPUT_DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss';
const SINGLE_BUS_STATS = ['meanwaitingtimebybus', 'maxwaitingtimebybus'];
const MULTI_BUS_STATS = ['meanwaitingtimebybus'];

var defaultBusDisplayed = _.first(BUSES, 15);

var StatsContainer = React.createClass({
    getInitialState: function () {
        return {
            selectedBus: ''
        }
    },
    callbackSelect: function (e) {
        var busNumber = e.target.value;
        getLatestsStats(busNumber ? SINGLE_BUS_STATS : MULTI_BUS_STATS, busNumber ? [e.target.value] : defaultBusDisplayed, busNumber)
            .then(function (statsData) {
                var __ret = this.generateLabelsAndDatasets(statsData, busNumber);
                this.state.myChart.data.datasets = __ret.datasets;
                this.state.myChart.data.labels = __ret.labels;
                if (__ret.datasets.length) {
                    this.setState({selectedBus: busNumber});
                    this.state.myChart.update()
                }
            }.bind(this))

    },
    componentDidMount: function () {
        getLatestsStats(MULTI_BUS_STATS, defaultBusDisplayed)
            .then(function (statsData) {
                var __ret = this.generateLabelsAndDatasets(statsData, false);
                var labels = __ret.labels;
                var datasets = __ret.datasets;
                this.generateChart(labels, datasets);
            }.bind(this))
    },
    generateChart: function (labels, datasets) {
        var ctx = document.getElementById("waitingTime");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: chartOptions.LINE_OPTIONS
        });
        this.setState({myChart: myChart})
    },
    generateDatasets: function (datasets, values, label) {
        var color = randomColor({luminosity: 'bright'});
        datasets.push({
            label: label,
            fill: false,
            lineTension: 0.3,
            borderColor: color,
            backgroundColor: color,
            borderDash: [],
            pointBorderWidth: 1,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            data: values.map(function (h) {
                return (h.value / 60).toFixed(2)
            })
        });
        return color;
    },
    generateLabelsAndDatasets: function (statsData, busNumber) {
        var data = statsData.hits.hits.map(function (h) {
            return h._source;
        });
        var labels = _.uniq(data.map(function (stat) {
                return moment(stat.timestamp).format(OUTPUT_DATE_FORMAT);
            }
        ));
        var hits = _.groupBy(data, busNumber ? 'stattype' : 'key');
        var datasets = [];
        if (!busNumber) {
            for (var i = 0; i < 300; i++) {
                if (hits[i] != null) {
                    this.generateDatasets(datasets, hits[i], hits[i][0].key);
                }
            }
        }
        else {
            if (hits['meanWaitingTimeByBus'] != null) {
                this.generateDatasets(datasets, hits['meanWaitingTimeByBus'], 'Average');
            }
            if (hits['maxWaitingTimeByBus'] != null) {
                this.generateDatasets(datasets, hits['maxWaitingTimeByBus'], 'Max');
            }
        }
        return {labels: labels, datasets: datasets};
    },
    render: function () {
        return (
            <Stats
                selectedBus={this.state.selectedBus}
                callbackSelect={this.callbackSelect}/>
        )
    }
});

module.exports = StatsContainer;