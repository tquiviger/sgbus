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

var defaultBusDisplayed = _.first(BUSES, 15)

var StatsContainer = React.createClass({
    callbackSelect: function (e) {
        getLatestsStats('meanwaitingtime', e.target.value ? [e.target.value] : defaultBusDisplayed)
            .then(function (statsData) {
                var __ret = this.generateLabelsAndDatasets(statsData);
                this.state.myChart.data.datasets = __ret.datasets;
                this.state.myChart.data.labels = __ret.labels;
                if (__ret.datasets.length) this.state.myChart.update()
            }.bind(this))

    },
    componentDidMount: function () {
        getLatestsStats('meanwaitingtime', defaultBusDisplayed)
            .then(function (statsData) {
                var __ret = this.generateLabelsAndDatasets(statsData);
                var labels = __ret.labels;
                var datasets = __ret.datasets;
                this.generateChart(labels, datasets);
            }.bind(this))
    },
    generateChart: function (labels, datasets) {
        var ctx = document.getElementById("meanWaitingTime");
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
    generateLabelsAndDatasets: function (statsData) {
        var data = statsData.hits.hits.map(function (h) {
            return h._source;
        })
        var labels = _.uniq(data.map(function (stat) {
                return moment(stat.timestamp).format(OUTPUT_DATE_FORMAT);
            }
        ));
        var hits = _.groupBy(data, 'key');
        var datasets = [];
        for (var i = 0; i < 300; i++) {
            if (hits[i] != null) {
                var color = randomColor({luminosity: 'bright'});
                datasets.push({
                    label: hits[i][0].key,
                    fill: false,
                    lineTension: 0.3,
                    borderColor: color,
                    backgroundColor: color,
                    borderDash: [],
                    pointBorderWidth: 1,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    data: hits[i].map(function (h) {
                        return (h.value / 60).toFixed(2)
                    })
                });
            }
        }
        return {labels: labels, datasets: datasets};
    },
    render: function () {
        return (
            <Stats
                callbackSelect={this.callbackSelect}/>
        )
    }
});

module.exports = StatsContainer;