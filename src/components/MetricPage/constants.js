/**
 * Options for pie chart
 */
export const pieOptions = {
    responsive: false,
    legend: {
        display: false,
        position: "right",
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
                var value = data.datasets[0].data[tooltipItem.index];
                var percentage = Math.round((value / sum) * 100);
                var label = data.labels[tooltipItem.index];
                return ` ${label}: ${percentage}% (${value})`;
            },
        },
        backgroundColor: "rgba(230, 230, 230, 0.9)",
        bodyFontColor: "#555555",
    },
    plugins: {
        datalabels: {
            font: { family: "Menlo, Monospace", weight: "bold" },
            textAlign: "center",
            formatter: (value, ctx) => {
                var datasets = ctx.chart.data.datasets;

                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    var sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    var percentage = Math.round((value / sum) * 100);
                    if (percentage > 5) {
                        return percentage + "%";
                    } else {
                        return "";
                    }
                }
            },
            color: "#fff",
        },
    },
};

/**
 * Returns colors of pie chart. If numLabels is specified, it will set that index
 * color to grey.
 * @param {int} numLabels
 */
export const pieColors = (numLabels) => {
    var colors = ["#FF6F8E", "#49ACED", "#FFCE56", "#5AC5C5", "#A274FF", "#D6D6D6"];
    if (numLabels) {
        return colors.slice(0, numLabels).concat(colors[colors.length - 1]);
    } else {
        return colors;
    }
};

export const pieWidth = 200;
