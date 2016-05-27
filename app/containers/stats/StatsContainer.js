var React = require('react');
var Stats = require('../../components/stats/Stats');
var getLatestsStats = require('../../helpers/api').getLatestsStats;
var Chart = require('chart.js')

var StatsContainer = React.createClass({
    getInitialState: function () {
        return {
            labels: [],
            values: []
        }
    }, componentDidMount: function () {
        var ctx = document.getElementById("myChart");
        getLatestsStats('meanWaitingTimeByBus')
            .then(function (statsData) {
                var data = statsData.hits.hits
                    .map(s=> s._source)
                this.setState({
                    labels: data.map(stat=>stat.timestamp),
                    values: data.map(stat=>stat.value)
                })
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.state.labels,
                        datasets: [{
                            label: 'Mean waiting time',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "#000",
                            borderColor: "#000",
                            borderDash: [],
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.state.values
                        }]
                    },
                    options: {
                        responsive: false,
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