/**
 * Options for pie chart
 */
export const pieOptions = {
    responsive: false,
    legend: {
        display: false,
        position: "right",
    },
    layout: {
        padding: {
            left: 2,
            right: 2,
            top: 2,
            bottom: 2,
        },
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
                var value = data.datasets[0].data[tooltipItem.index];
                var percentage = Math.round((value / sum) * 100);
                var label = data.labels[tooltipItem.index];
                if (label.length > 20) {
                    label = label.substring(0, 20) + "..";
                }
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
 * Options for line chart
 */
export const lineOptions = {
           responsive: false,
           legend: {
               display: false,
           },
           layout: {
               padding: {
                   top: 20,
               },
           },
           tooltips: {
               displayColors: false,
               caretSize: 0,
               caretPadding: 10,
           },
           plugins: {
               datalabels: {
                   display: false,
               },
           },
       };

/**
 * Returns colors of pie chart. If numLabels is specified, it will set that index
 * color to grey.
 * @param {int} numLabels
 */
export const colors = (numLabels) => {
    var colors = [
        "#FF6F8E",
        "#49ACED",
        "#FFCE56",
        "#5AC5C5",
        "#A274FF",
        "#ffa974",
        "#70ffd9",
        "#D6D6D6",
    ];
    if (numLabels) {
        return colors.slice(0, numLabels).concat(colors[colors.length - 1]);
    } else {
        return colors;
    }
};

/**
 * Width of pie graph
 */
export const pieWidth = 200;

/**
 * Width of line graph
 */
export const lineWidth = 600;

/**
 * Default values for metrics, update when adding more data
 */
export const defaultMetrics = {
    hackers: null,
    projects: null,
    firstTimeHackers: null,
    majors: null,
    gender_F: null,
    gender_M: null,
    gender_NB: null,
    gender_N: null,
    race_WC: null,
    race_API: null,
    race_H: null,
    race_BAA: null,
    race_AIAN: null,
    race_N: null,
    levelOfStudy_HS: null,
    levelOfStudy_TS: null,
    levelOfStudy_UU: null,
    levelOfStudy_GU: null,
    levelOfStudy_N: null,
    diet_VT: null,
    diet_VE: null,
    diet_L: null,
    diet_G: null,
    diet_NA: null,
    diet_H: null,
    diet_K: null,
    diet_O: null,
    diet_N: null,
    shirt_XS: null,
    shirt_S: null,
    shirt_M: null,
    shirt_L: null,
    shirt_XL: null,
    shirt_XXL: null,
};
