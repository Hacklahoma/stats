/**
 * Options for pie chart
 */
export const pieOptions = {
  responsive: false,
  legend: {
    display: false,
    position: 'right',
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
      label(tooltipItem, data) {
        const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
        const value = data.datasets[0].data[tooltipItem.index];
        const percentage = Math.round((value / sum) * 100);
        let label = data.labels[tooltipItem.index];
        if (label.length > 20 && label.length !== 22) {
          label = `${label.substring(0, 20)}..`;
        }
        return ` ${label}: ${percentage}% (${value})`;
      },
    },
    backgroundColor: 'rgba(230, 230, 230, 0.9)',
    bodyFontColor: '#555555',
  },
  plugins: {
    datalabels: {
      font: { family: 'Menlo, Monospace', weight: 'bold' },
      textAlign: 'center',
      formatter: (value, ctx) => {
        const datasets = ctx.chart.data.datasets;

        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
          const sum = datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / sum) * 100);
          if (percentage > 5) {
            return `${percentage}%`;
          }
          return '';
        }
      },
      color: '#fff',
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
export const getColors = (numLabels) => {
  const colors = [
    '#FF6F8E',
    '#49ACED',
    '#FFCE56',
    '#ffa974',
    '#3ccfcf',
    '#7be38f',
    '#A274FF',
    '#bbb3ff',
    '#ffb3f9',
    '#D6D6D6',
  ];
  if (numLabels) {
    return colors.slice(0, numLabels).concat(colors[colors.length - 1]);
  }
  return colors;
};

/**
 * Width of pie graph
 */
export const pieWidth = 250;

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
  majors: {
    types: [],
    quantities: [],
    raw: [],
  },
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
