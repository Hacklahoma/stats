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
            bottom: 2
        }
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
 * Returns colors of pie chart. If numLabels is specified, it will set that index
 * color to grey.
 * @param {int} numLabels
 */
export const pieColors = (numLabels) => {
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

/**
 * Iterates through data and returns object
 * @param {array} data 
 * @param {object} metrics 
 * @param {function} setMetrics 
 */
export const parseMetrics = (data, metrics, setMetrics) => {
    setMetrics({
        hackers: metrics ? metrics.hackers + data.metrics.hackers : data.metrics.hackers,
        projects: metrics ? metrics.projects + data.metrics.projects : data.metrics.projects,
        gender_F: metrics ? metrics.gender_F + data.metrics.gender_F : data.metrics.gender_F,
        gender_M: metrics ? metrics.gender_M + data.metrics.gender_M : data.metrics.gender_M,
        gender_NB: metrics ? metrics.gender_NB + data.metrics.gender_NB : data.metrics.gender_NB,
        gender_N: metrics ? metrics.gender_N + data.metrics.gender_N : data.metrics.gender_N,
        race_WC: metrics ? metrics.race_WC + data.metrics.race_WC : data.metrics.race_WC,
        race_API: metrics ? metrics.race_API + data.metrics.race_API : data.metrics.race_API,
        race_H: metrics ? metrics.race_H + data.metrics.race_H : data.metrics.race_H,
        race_BAA: metrics ? metrics.race_BAA + data.metrics.race_BAA : data.metrics.race_BAA,
        race_AIAN: metrics ? metrics.race_AIAN + data.metrics.race_AIAN : data.metrics.race_AIAN,
        race_N: metrics ? metrics.race_N + data.metrics.race_N : data.metrics.race_N,
        levelOfStudy_HS: metrics ? metrics.levelOfStudy_HS + data.metrics.levelOfStudy_HS : data.metrics.levelOfStudy_HS,
        levelOfStudy_TS: metrics ? metrics.levelOfStudy_TS + data.metrics.levelOfStudy_TS : data.metrics.levelOfStudy_TS,
        levelOfStudy_UU: metrics ? metrics.levelOfStudy_UU + data.metrics.levelOfStudy_UU : data.metrics.levelOfStudy_UU,
        levelOfStudy_GU: metrics ? metrics.levelOfStudy_GU + data.metrics.levelOfStudy_GU : data.metrics.levelOfStudy_GU,
        levelOfStudy_N: metrics ? metrics.levelOfStudy_N + data.metrics.levelOfStudy_N : data.metrics.levelOfStudy_N,
        diet_VT: metrics ? metrics.diet_VT + data.metrics.diet_VT : data.metrics.diet_VT,
        diet_VE: metrics ? metrics.diet_VE + data.metrics.diet_VE : data.metrics.diet_VE,
        diet_L: metrics ? metrics.diet_L + data.metrics.diet_L : data.metrics.diet_L,
        diet_G: metrics ? metrics.diet_G + data.metrics.diet_G : data.metrics.diet_G,
        diet_NA: metrics ? metrics.diet_NA + data.metrics.diet_NA : data.metrics.diet_NA,
        diet_H: metrics ? metrics.diet_H + data.metrics.diet_H : data.metrics.diet_H,
        diet_K: metrics ? metrics.diet_K + data.metrics.diet_K : data.metrics.diet_K,
        diet_O: metrics ? metrics.diet_O + data.metrics.diet_O : data.metrics.diet_O,
        diet_N: metrics ? metrics.diet_N + data.metrics.diet_N : data.metrics.diet_N,
        shirt_XS: metrics ? metrics.shirt_XS + data.metrics.shirt_XS : data.metrics.shirt_XS,
        shirt_S: metrics ? metrics.shirt_S + data.metrics.shirt_S : data.metrics.shirt_S,
        shirt_M: metrics ? metrics.shirt_M + data.metrics.shirt_M : data.metrics.shirt_M,
        shirt_L: metrics ? metrics.shirt_L + data.metrics.shirt_L : data.metrics.shirt_L,
        shirt_XL: metrics ? metrics.shirt_XL + data.metrics.shirt_XL : data.metrics.shirt_XL,
        shirt_XXL: metrics ? metrics.shirt_XXL + data.metrics.shirt_XXL : data.metrics.shirt_XXL,
    });
}