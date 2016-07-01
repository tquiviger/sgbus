var LINE_OPTIONS = {
    responsive: true,
    hover: {
        mode: 'dataset'
    },
    title: {
        display: true,
        text: 'Waiting time (in minutes)'
    },
    legend: {
        position: 'bottom',
        labels: {
            boxWidth: 10,
            fontColor: '#000'
        }
    }, scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

module.exports = {
    LINE_OPTIONS: LINE_OPTIONS
};