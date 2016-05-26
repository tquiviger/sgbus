var React = require('react');
var Stats= require('../../components/stats/Stats');
var Chart = require('chart.js')

var StatsContainer = React.createClass({
    componentDidMount: function () {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            defaultColor: '#fff',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3]
                }]
            },
            options: {
                responsive:false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    },
    render: function () {
        return (
            <Stats/>
        )
    }
});

module.exports = StatsContainer;