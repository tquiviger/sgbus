var React = require('react');
var Stats = require('../../components/stats/Stats');
var moment = require('moment');
var getLatestsStats = require('../../helpers/api').getLatestsStats;
var Chart = require('chart.js');
var _ = require('underscore');
var randomColor = require('randomcolor');

const outputDateFormat = 'DD/MM/YYYY HH:mm:ss';
const busArray = ['10', '100', '101', '102', '103', '105', '106', '107', '107M', '109', '10e', '11', '111', '112', '113', '115', '116', '117', '118', '119', '12', '120', '121', '122', '123', '123M', '124', '125', '128', '13', '130', '131', '131M', '132', '133', '134', '135', '136', '138', '139', '139M', '14', '140', '141', '142', '143', '143M', '145', '147', '14e', '15', '150', '151', '151e', '153', '154', '155', '156', '157', '158', '159', '16', '160', '161', '162', '162M', '163', '163M', '165', '166', '167', '168', '169', '17', '170', '170A', '170X', '171', '172', '173', '174', '174e', '175', '176', '177', '178', '179', '17A', '18', '180', '181', '181M', '182', '182M', '183', '184', '185', '186', '187', '188', '188E', '188R', '189', '19', '190', '191', '192', '193', '194', '195', '196', '196e', '197', '198', '199', '1N', '2', '20', '200', '201', '21', '22', '222', '225', '225G', '225W', '228', '229', '23', '231', '232', '235', '238', '24', '240', '241', '242', '243', '243G', '243W', '246', '249', '25', '251', '252', '253', '254', '255', '256', '257', '258', '26', '261', '262', '265', '268', '269', '27', '272', '273', '28', '282', '284', '285', '29', '291', '292', '293', '2N', '3', '30', '300', '301', '302', '307', '308', '30e', '31', '315', '317', '32', '324', '325', '33', '333', '334', '335', '34', '35', '354', '358', '359', '35M', '36', '37', '371', '372', '38', '382G', '382W', '386', '39', '3N', '4', '40', '400', '401', '402', '403', '405', '408', '41', '410', '410G', '410W', '42', '43', '43M', '45', '47', '48', '49', '4N', '5', '50', '502', '502A', '506', '51', '513', '518', '518A', '52', '529', '53', '530', '531', '533', '534', '535', '536', '538', '539', '53M', '54', '544', '545', '546', '549', '55', '552', '553', '554', '555', '56', '560', '561', '563', '564', '565', '569', '57', '58', '585', '587', '588', '589', '59', '590', '598', '599', '5N', '6', '60', '61', '62', '63', '63M', '64', '65', '66', '67', '69', '6N', '7', '70', '700', '700A', '70M', '72', '73', '74', '74e', '75', '76', '761', '77', '78', '79', '8', '80', '800', '803', '804', '805', '806', '81', '811', '812', '82', '825', '83', '84', '85', '850E', '851', '852', '853', '853C', '854', '854E', '855', '856', '857', '858', '859', '859A', '859B', '86', '860', '868', '87', '88', '882', '89', '89e', '9', '90', '900', '900A', '901', '902', '903', '904', '91', '911', '912', '913', '92', '920', '922', '925', '925C', '926', '927', '92M', '93', '94', '941', '945', '947', '95', '950', '951E', '96', '960', '961', '961C', '962', '963', '963E', '963R', '964', '965', '966', '969', '97', '970', '971E', '972', '975', '979', '979M', '97e', '98', '980', '981', '982E', '983', '985', '98M', '99', '990', 'BPS1', 'CT18', 'CT28', 'CT8', 'NR1', 'NR2', 'NR3', 'NR5', 'NR6', 'NR7', 'NR8', 'RWS8'];
var defaultBusDisplayed = _.first(busArray, 10)

var StatsContainer = React.createClass({
    callbackSelect: function (e) {
        getLatestsStats('meanWaitingTime', e.target.value ? [e.target.value] : defaultBusDisplayed)
            .then(function (statsData) {
                var __ret = this.processData(statsData);
                this.state.myChart.data.datasets = __ret.datasets
                this.state.myChart.data.labels = __ret.labels
                this.state.myChart.update()
            }.bind(this))

    },
    componentDidMount: function () {
        getLatestsStats('meanWaitingTime', defaultBusDisplayed)
            .then(function (statsData) {
                var __ret = this.processData(statsData);
                var labels = __ret.labels;
                var datasets = __ret.datasets;
                this.generateChartjs(labels, datasets);
            }.bind(this))
    },
    generateChartjs: function (labels, datasets) {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: false,
                hover: {
                    mode: 'dataset'
                },
                title: {
                    display: true,
                    text: 'Average waiting time bys bus (in sec)'
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        fontColor: '#fff'
                    }
                }
            }
        });
        this.setState({myChart: myChart})
    },
    processData: function (statsData) {
        var data = _.pluck(statsData.hits.hits, '_source');
        var labels = _.uniq(data.map(function (stat) {
                return moment(stat.timestamp).format(outputDateFormat);
            }
        )).sort();
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
                    data: _.pluck(hits[i], 'value')
                });
            }
        }
        return {labels: labels, datasets: datasets};
    },
    render: function () {
        return (
            <Stats
                busArray={busArray}
                callbackSelect={this.callbackSelect}/>
        )
    }
});

module.exports = StatsContainer;