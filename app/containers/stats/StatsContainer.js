var React = require('react');
var Stats = require('../../components/stats/Stats');
var moment = require('moment');
var getLatestsStats = require('../../helpers/api').getLatestsStats;
var Chart = require('chart.js')
var _ = require('underscore')


var StatsContainer = React.createClass({
    getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    getInitialState: function () {
        return {
            labels: []
        }
    }, componentDidMount: function () {
        var ctx = document.getElementById("myChart");
        getLatestsStats('meanWaitingTime')
            .then(function (statsData) {
                var data = _.pluck(statsData.hits.hits, '_source');
                var hits = _.groupBy(data, 'key');
                var datasets = [];
                for (var i = 0; i < 110; i++) {
                    if (hits[i] != null) {
                        datasets.push({
                            label: hits[i][0].key,
                            fill: false,
                            lineTension: 0.3,
                            borderColor: this.getRandomColor(),
                            borderDash: [],
                            pointBorderWidth: 1,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            data: _.pluck(hits[i], 'value')
                        });
                    }
                }
                this.setState({
                    labels: _.uniq(data.map(function (stat) {
                        return moment(stat.timestamp).format('DD/MM/YYYY HH:mm:ss');
                    })).sort()
                });
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.state.labels,
                        datasets: datasets
                    },
                    options: {
                        responsive: false,
                        title: {
                            display: true,
                            text: 'Mean waiting time bys bus (in sec)'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }.bind(this));


    },
    render: function () {
        return (
            <Stats/>
        )
    }
});

module.exports = StatsContainer;