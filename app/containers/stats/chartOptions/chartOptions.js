LINE_OPTIONS = {
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
            fontColor: '#fff'
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
}