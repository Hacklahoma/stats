/**
 * Options for pie chart
 */
export const pieOptions = {
    responsive: false,
    legend: {
        display: false,
        position: "right",
    },
    plugins: {
        datalabels: {
            font: { family: "Menlo, Monospace", weight: "bold" },
            textAlign: "center",
            formatter: (value, ctx) => {
                let datasets = ctx.chart.data.datasets;

                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    let percentage = Math.round((value / sum) * 100);
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
