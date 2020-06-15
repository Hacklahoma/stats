import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const StyledMetricPage = styled.div`
    margin-top: 20px;
    .topStats {
        max-width: calc(100vw - 20px);
        .item {
            display: inline-block;
            padding: 0 20px 5px 0;
            .label {
                font-size: 0.85em;
            }
            .data {
                font-size: 1.6em;
                font-weight: bold;
            }
        }
        .item:first-child {
            margin-left: 0;
        }
    }
    .graphs {
        canvas {
            width: 500px;
            height: 300px;
            float: left;
        }
    }
    @media only screen and (max-width: 619px) {
    }
`;

/**
 * Query's metrics from specific year from DB
 */
const YEAR_METRICS = gql`
    query Year($id: ID!) {
        Year(where: { id: $id }) {
            _hackersMeta {
                count
            }
        }
    }
`;

/**
 * Query's overall metrics from DB
 */
const OVERALL_METRICS = gql`
    query {
        allYears {
            _hackersMeta {
                count
            }
        }
    }
`;

/**
 * Options for Pie chart
 */
const pieOptions = {
    responsive: false,
    legend: {
        display: true,
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
                    let percentage = Math.round((value / sum) * 100) + "%";
                    return percentage;
                } else {
                    return percentage;
                }
            },
            color: "#fff",
        },
    },
};

// const pieColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#D6D6D6"];

const pieColors = ["#FF6F8E", "#49ACED", "#FFCE56", "#5AC5C5", "#A274FF", "#D6D6D6"];

function MetricPage({ year, yearId }) {
    const { loading, error, data, refetch } = useQuery(
        yearId > 0 ? YEAR_METRICS : OVERALL_METRICS,
        yearId > 0 && {
            variables: {
                id: yearId,
            },
        }
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <StyledMetricPage>
            <div className="topStats">
                <div className="item">
                    <p className="label">Total Hackers</p>
                    {year !== "" && <p className="data">{data.Year._hackersMeta.count}</p>}
                </div>
                <div className="item">
                    <p className="label">Total Projects</p>
                    <p className="data"></p>
                </div>
                <div className="item">
                    <p className="label">Unique Hackers</p>
                    <p className="data"></p>
                </div>
                <div className="item">
                    <p className="label">First Time Hackers</p>
                    <p className="data"></p>
                </div>
            </div>
            <div className="graphs">
                {/* Diversity */}
                <Pie
                    width="500"
                    height="300"
                    className="graph"
                    data={{
                        labels: [
                            "White/Caucasian",
                            "Asian/Pacific Islander",
                            "Hispanic",
                            "Black or African American",
                            "American Indian or Alaskan Native",
                            "Prefer not to answer",
                        ],
                        datasets: [
                            {
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: pieColors
                                    .slice(0, 5)
                                    .concat(pieColors[pieColors.length - 1]),
                                borderWidth: 0,
                            },
                        ],
                    }}
                    options={{
                        ...pieOptions,
                        title: {
                            display: true,
                            text: "Diversity",
                            fontSize: "20",
                            fontFamily: "Avenir",
                        },
                    }}
                />
                {/* Gender */}
                <Pie
                    width="500"
                    height="300"
                    className="graph"
                    data={{
                        labels: ["Male", "Female", "Non-binary", "Prefer not to answer"],
                        datasets: [
                            {
                                data: [14, 6, 3, 6],
                                backgroundColor: pieColors
                                    .slice(0, 3)
                                    .concat(pieColors[pieColors.length - 1]),
                                borderColor: ["white"],
                                borderWidth: 0,
                            },
                        ],
                    }}
                    options={{
                        ...pieOptions,
                        title: {
                            display: true,
                            text: "Gender",
                            fontSize: "20",
                            fontFamily: "Avenir",
                        },
                    }}
                />
                {/* Level of Study */}
                <Pie
                    width="500"
                    height="300"
                    className="graph"
                    data={{
                        labels: ["High School", "Tech School", "Undergraduate", "Graduate"],
                        datasets: [
                            {
                                data: [14, 6, 3, 6],
                                backgroundColor: pieColors,
                                borderColor: ["white"],
                                borderWidth: 0,
                            },
                        ],
                    }}
                    options={{
                        ...pieOptions,
                        title: {
                            display: true,
                            text: "Level of Study",
                            fontSize: "20",
                            fontFamily: "Avenir",
                        },
                    }}
                />
            </div>
        </StyledMetricPage>
    );
}

export default MetricPage;
