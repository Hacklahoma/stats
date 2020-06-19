import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import "chartjs-plugin-datalabels";
import PieGraph from "./MetricChildren/PieGraph";
import Grid from "@material-ui/core/Grid";
import { defaultMetrics } from "./utils";
import { useEffect } from "react";

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
            metrics {
                hackers
                projects
                majors {
                    type
                }
                gender_F
                gender_M
                gender_NB
                gender_N
                race_WC
                race_API
                race_H
                race_BAA
                race_AIAN
                race_N
                levelOfStudy_HS
                levelOfStudy_TS
                levelOfStudy_UU
                levelOfStudy_GU
                levelOfStudy_N
                diet_VT
                diet_VE
                diet_L
                diet_G
                diet_NA
                diet_H
                diet_K
                diet_O
                diet_N
                shirt_XS
                shirt_S
                shirt_M
                shirt_L
                shirt_XL
                shirt_XXL
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
            metrics {
                hackers
                projects
                majors {
                    type
                }
                gender_F
                gender_M
                gender_NB
                gender_N
                race_WC
                race_API
                race_H
                race_BAA
                race_AIAN
                race_N
                levelOfStudy_HS
                levelOfStudy_TS
                levelOfStudy_UU
                levelOfStudy_GU
                levelOfStudy_N
                diet_VT
                diet_VE
                diet_L
                diet_G
                diet_NA
                diet_H
                diet_K
                diet_O
                diet_N
                shirt_XS
                shirt_S
                shirt_M
                shirt_L
                shirt_XL
                shirt_XXL
            }
        }
    }
`;

var metrics = JSON.parse(JSON.stringify(defaultMetrics));

function MetricPage({ user, year, yearId }) {
    // Rendering either all years or a single year
    const { loading, error, data, refetch } = useQuery(
        yearId > 0 ? YEAR_METRICS : OVERALL_METRICS,
        yearId > 0 && {
            variables: {
                id: yearId,
            },
        }
    );

    /**
     * Called when switching year
     * Refetch and reset our variable
     */
    useEffect(() => {
        metrics = JSON.parse(JSON.stringify(defaultMetrics));
        refetch();
    }, [yearId]);

    // Loading state
    if (loading) {
        return <p>Loading...</p>;
    } else if (data.allYears && data.allYears.length > 0) {
        // Get data for OVERALL data
        for (var i in data.allYears) {
            metrics.hackers += data.allYears[i].metrics.hackers;
            metrics.projects += data.allYears[i].metrics.projects;
            metrics.gender_F += data.allYears[i].metrics.gender_F;
            metrics.gender_M += data.allYears[i].metrics.gender_M;
            metrics.gender_NB += data.allYears[i].metrics.gender_NB;
            metrics.gender_N += data.allYears[i].metrics.gender_N;
            metrics.race_WC += data.allYears[i].metrics.race_WC;
            metrics.race_API += data.allYears[i].metrics.race_API;
            metrics.race_H += data.allYears[i].metrics.race_H;
            metrics.race_BAA += data.allYears[i].metrics.race_BAA;
            metrics.race_AIAN += data.allYears[i].metrics.race_AIAN;
            metrics.race_N += data.allYears[i].metrics.race_N;
            metrics.levelOfStudy_HS += data.allYears[i].metrics.levelOfStudy_HS;
            metrics.levelOfStudy_TS += data.allYears[i].metrics.levelOfStudy_TS;
            metrics.levelOfStudy_UU += data.allYears[i].metrics.levelOfStudy_UU;
            metrics.levelOfStudy_GU += data.allYears[i].metrics.levelOfStudy_GU;
            metrics.levelOfStudy_N += data.allYears[i].metrics.levelOfStudy_N;
            metrics.diet_VT += data.allYears[i].metrics.diet_VT;
            metrics.diet_VE += data.allYears[i].metrics.diet_VE;
            metrics.diet_L += data.allYears[i].metrics.diet_L;
            metrics.diet_G += data.allYears[i].metrics.diet_G;
            metrics.diet_NA += data.allYears[i].metrics.diet_NA;
            metrics.diet_H += data.allYears[i].metrics.diet_H;
            metrics.diet_K += data.allYears[i].metrics.diet_K;
            metrics.diet_O += data.allYears[i].metrics.diet_O;
            metrics.diet_N += data.allYears[i].metrics.diet_N;
            metrics.shirt_XS += data.allYears[i].metrics.shirt_XS;
            metrics.shirt_S += data.allYears[i].metrics.shirt_S;
            metrics.shirt_M += data.allYears[i].metrics.shirt_M;
            metrics.shirt_L += data.allYears[i].metrics.shirt_L;
            metrics.shirt_XL += data.allYears[i].metrics.shirt_XL;
            metrics.shirt_XXL += data.allYears[i].metrics.shirt_XXL;
        }
        metrics.levelOfStudy_N -= data.allYears[2].metrics.levelOfStudy_N;
        metrics.race_N -= data.allYears[2].metrics.race_N;
    } else if (data.Year) {
        // Get data for YEAR data
        metrics.hackers = data.Year.metrics.hackers;
        metrics.projects = data.Year.metrics.projects;
        metrics.gender_F = data.Year.metrics.gender_F;
        metrics.gender_M = data.Year.metrics.gender_M;
        metrics.gender_NB = data.Year.metrics.gender_NB;
        metrics.gender_N = data.Year.metrics.gender_N;
        metrics.race_WC = data.Year.metrics.race_WC;
        metrics.race_API = data.Year.metrics.race_API;
        metrics.race_H = data.Year.metrics.race_H;
        metrics.race_BAA = data.Year.metrics.race_BAA;
        metrics.race_AIAN = data.Year.metrics.race_AIAN;
        metrics.race_N = data.Year.metrics.race_N;
        metrics.levelOfStudy_HS = data.Year.metrics.levelOfStudy_HS;
        metrics.levelOfStudy_TS = data.Year.metrics.levelOfStudy_TS;
        metrics.levelOfStudy_UU = data.Year.metrics.levelOfStudy_UU;
        metrics.levelOfStudy_GU = data.Year.metrics.levelOfStudy_GU;
        metrics.levelOfStudy_N = data.Year.metrics.levelOfStudy_N;
        metrics.diet_VT = data.Year.metrics.diet_VT;
        metrics.diet_VE = data.Year.metrics.diet_VE;
        metrics.diet_L = data.Year.metrics.diet_L;
        metrics.diet_G = data.Year.metrics.diet_G;
        metrics.diet_NA = data.Year.metrics.diet_NA;
        metrics.diet_H = data.Year.metrics.diet_H;
        metrics.diet_K = data.Year.metrics.diet_K;
        metrics.diet_O = data.Year.metrics.diet_O;
        metrics.diet_N = data.Year.metrics.diet_N;
        metrics.shirt_XS = data.Year.metrics.shirt_XS;
        metrics.shirt_S = data.Year.metrics.shirt_S;
        metrics.shirt_M = data.Year.metrics.shirt_M;
        metrics.shirt_L = data.Year.metrics.shirt_L;
        metrics.shirt_XL = data.Year.metrics.shirt_XL;
        metrics.shirt_XXL = data.Year.metrics.shirt_XXL;
    }

    return (
        <StyledMetricPage>
            <div className="topStats">
                <div className="item">
                    <p className="label">Total Hackers</p>
                    <p className="data">{metrics.hackers}</p>
                </div>
                <div className="item">
                    <p className="label">Total Projects</p>
                    <p className="data">{metrics.projects}</p>
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
                    {/* GENDER */}
                    <PieGraph
                        title="Gender"
                        labels={["Male", "Female", "Non-binary", "Prefer not to answer"]}
                        data={[
                            metrics.gender_M,
                            metrics.gender_F,
                            metrics.gender_NB,
                            metrics.gender_N,
                        ]}
                    />
                    {/* DIVERSITY */}
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
                        data={[
                            metrics.race_WC,
                            metrics.race_API,
                            metrics.race_H,
                            metrics.race_BAA,
                            metrics.race_AIAN,
                            metrics.race_N,
                        ]}
                    />
                    {/* LEVEL OF STUDY */}
                    <PieGraph
                        title="Level of study"
                        labels={[
                            "High School",
                            "Tech School",
                            "Undergraduate",
                            "Graduate",
                            "Prefer not to answer",
                        ]}
                        data={[
                            metrics.levelOfStudy_HS,
                            metrics.levelOfStudy_TS,
                            metrics.levelOfStudy_UU,
                            metrics.levelOfStudy_GU,
                            metrics.levelOfStudy_N,
                        ]}
                    />
                    {/* Diet */}
                    <PieGraph
                        title="Diet"
                        labels={[
                            "Vegetarian",
                            "Vegan",
                            "Lactose",
                            "Gluten",
                            "Nut Allergy",
                            "Halal",
                            "Kosher",
                            "Other",
                        ]}
                        data={[
                            metrics.diet_VT,
                            metrics.diet_VE,
                            metrics.diet_L,
                            metrics.diet_G,
                            metrics.diet_NA,
                            metrics.diet_H,
                            metrics.diet_K,
                            metrics.diet_O,
                        ]}
                    />
                    {/* Shirt size (ADMIN ONLY) */}
                    {user.isAdmin && (
                        <PieGraph
                            title="Shirt size"
                            labels={["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"]}
                            data={[
                                metrics.shirt_XS,
                                metrics.shirt_S,
                                metrics.shirt_M,
                                metrics.shirt_L,
                                metrics.shirt_XL,
                                metrics.shirt_XXL,
                            ]}
                        />
                    )}
                </Grid>
            </div>
        </StyledMetricPage>
    );
}

export default MetricPage;
