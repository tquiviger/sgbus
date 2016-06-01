LINE_OPTIONS = {
    responsive: true,
    hover: {
        mode: 'dataset'
    },
    title: {
        display: true,
        text: 'Average waiting time bys bus (in minutes)'
    },
    legend: {
        position: 'bottom',
        labels: {
            boxWidth: 10,
            fontColor: '#fff'
        }
    },scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};

module.exports = {
    LINE_OPTIONS: LINE_OPTIONS
}