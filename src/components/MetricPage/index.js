import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import "chartjs-plugin-datalabels";
import PieGraph from "./MetricChildren/PieGraph";
import Grid from "@material-ui/core/Grid";

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
        margin-top: 40px;
        .MuiGrid-container {
            width: calc(100% - 30px);
        }
    }
    @media only screen and (max-width: 619px) {
        .graphs {
            .MuiGrid-container {
                width: calc(100% - 20px);
                .MuiGrid-item {
                    width: 100%;
                }
            }
        }
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
                <Grid container spacing={3}>
                    <PieGraph
                        title="Gender"
                        labels={["Male", "Female", "Non-binary", "Prefer not to answer"]}
                        data={[12, 19, 3, 2]}
                    />
                    <PieGraph
                        title="Diversity"
                        labels={[
                            "White/Caucasian",
                            "Asian/Pacific Islander",
                            "Hispanic",
                            "Black or African American",
                            "American Indian or Alaskan Native",
                            "Prefer not to answer",
                        ]}
                        data={[12, 19, 3, 2, 15, 5]}
                    />
                    <PieGraph
                        title="Level of study"
                        labels={["High School", "Tech School", "Undergraduate", "Graduate"]}
                        data={[12, 19, 3, 2]}
                    />
                </Grid>
            </div>
        </StyledMetricPage>
    );
}

export default MetricPage;
