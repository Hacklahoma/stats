import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import "chartjs-plugin-datalabels";
import PieGraph from "./MetricChildren/PieGraph";
import Grid from "@material-ui/core/Grid";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { defaultMetrics } from "./utils";
import { useEffect } from "react";
import Router from "next/router";
import { Tooltip } from "@material-ui/core";

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
                position: relative;
                font-size: 1.6em;
                font-weight: bold;
                align-items: top;
                .quiet {
                    font-weight: normal;
                    font-size: 0.8em;
                }
                .difference {
                    position: absolute;
                    top: 2.5px;
                    margin-left: 6px;
                    color: #aaa;
                    font-weight: normal;
                    font-size: 0.5em;
                    svg {
                        margin-bottom: -8px;
                        margin-right: -5px;
                    }
                    &.up {
                        top: 0;
                        color: green;
                        margin-left: 0;
                    }
                    &.down {
                        top: 0;
                        color: red;
                        margin-left: 0;
                    }
                }
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
            disabled
            metrics {
                hackers
                projects
                firstTimeHackers
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
            disabled
            metrics {
                hackers
                projects
                firstTimeHackers
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

function MetricPage({ user, year, yearId }) {
    var metrics = JSON.parse(JSON.stringify(defaultMetrics));
    const { loading, error, data, refetch } = useQuery(OVERALL_METRICS);

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
    } else if (yearId === 0 && data.allYears.length > 0) {
        // Get data for OVERALL data
        for (var i in data.allYears) {
            if (data.allYears[i].disabled) {
                continue;
            }

            metrics.hackers += data.allYears[i].metrics.hackers;
            metrics.projects += data.allYears[i].metrics.projects;
            metrics.firstTimeHackers += data.allYears[i].metrics.firstTimeHackers;
            metrics.gender_F += data.allYears[i].metrics.gender_F;
            metrics.gender_M += data.allYears[i].metrics.gender_M;
            metrics.gender_NB += data.allYears[i].metrics.gender_NB;
            metrics.gender_N += data.allYears[i].metrics.gender_N;
            metrics.race_WC += data.allYears[i].metrics.race_WC;
            metrics.race_API += data.allYears[i].metrics.race_API;
            metrics.race_H += data.allYears[i].metrics.race_H;
            metrics.race_BAA += data.allYears[i].metrics.race_BAA;
            metrics.race_AIAN += data.allYears[i].metrics.race_AIAN;
            if (data.allYears[i].metrics.race_N !== data.allYears[i].metrics.hackers)
                metrics.race_N += data.allYears[i].metrics.race_N;
            metrics.levelOfStudy_HS += data.allYears[i].metrics.levelOfStudy_HS;
            metrics.levelOfStudy_TS += data.allYears[i].metrics.levelOfStudy_TS;
            metrics.levelOfStudy_UU += data.allYears[i].metrics.levelOfStudy_UU;
            metrics.levelOfStudy_GU += data.allYears[i].metrics.levelOfStudy_GU;
            if (data.allYears[i].metrics.levelOfStudy_N !== data.allYears[i].metrics.hackers)
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
    } else if (data.allYears[yearId - 1] && !data.allYears[yearId - 1].disabled) {
        // Get data for YEAR data
        metrics.hackers = data.allYears[yearId - 1].metrics.hackers;
        metrics.projects = data.allYears[yearId - 1].metrics.projects;
        metrics.firstTimeHackers = data.allYears[yearId - 1].metrics.firstTimeHackers;
        metrics.gender_F = data.allYears[yearId - 1].metrics.gender_F;
        metrics.gender_M = data.allYears[yearId - 1].metrics.gender_M;
        metrics.gender_NB = data.allYears[yearId - 1].metrics.gender_NB;
        metrics.gender_N = data.allYears[yearId - 1].metrics.gender_N;
        metrics.race_WC = data.allYears[yearId - 1].metrics.race_WC;
        metrics.race_API = data.allYears[yearId - 1].metrics.race_API;
        metrics.race_H = data.allYears[yearId - 1].metrics.race_H;
        metrics.race_BAA = data.allYears[yearId - 1].metrics.race_BAA;
        metrics.race_AIAN = data.allYears[yearId - 1].metrics.race_AIAN;
        metrics.race_N = data.allYears[yearId - 1].metrics.race_N;
        metrics.levelOfStudy_HS = data.allYears[yearId - 1].metrics.levelOfStudy_HS;
        metrics.levelOfStudy_TS = data.allYears[yearId - 1].metrics.levelOfStudy_TS;
        metrics.levelOfStudy_UU = data.allYears[yearId - 1].metrics.levelOfStudy_UU;
        metrics.levelOfStudy_GU = data.allYears[yearId - 1].metrics.levelOfStudy_GU;
        metrics.levelOfStudy_N = data.allYears[yearId - 1].metrics.levelOfStudy_N;
        metrics.diet_VT = data.allYears[yearId - 1].metrics.diet_VT;
        metrics.diet_VE = data.allYears[yearId - 1].metrics.diet_VE;
        metrics.diet_L = data.allYears[yearId - 1].metrics.diet_L;
        metrics.diet_G = data.allYears[yearId - 1].metrics.diet_G;
        metrics.diet_NA = data.allYears[yearId - 1].metrics.diet_NA;
        metrics.diet_H = data.allYears[yearId - 1].metrics.diet_H;
        metrics.diet_K = data.allYears[yearId - 1].metrics.diet_K;
        metrics.diet_O = data.allYears[yearId - 1].metrics.diet_O;
        metrics.diet_N = data.allYears[yearId - 1].metrics.diet_N;
        metrics.shirt_XS = data.allYears[yearId - 1].metrics.shirt_XS;
        metrics.shirt_S = data.allYears[yearId - 1].metrics.shirt_S;
        metrics.shirt_M = data.allYears[yearId - 1].metrics.shirt_M;
        metrics.shirt_L = data.allYears[yearId - 1].metrics.shirt_L;
        metrics.shirt_XL = data.allYears[yearId - 1].metrics.shirt_XL;
        metrics.shirt_XXL = data.allYears[yearId - 1].metrics.shirt_XXL;
    }

    function getDifference(current, past, percentage) {
        if (yearId === 0) return;
        const diff = current - past;
        return (
            <span className={`difference ${diff > 0 && "up"} ${ diff < 0 && "down"}`}>
                {diff > 0 && <ArrowDropUp />}
                {diff < 0 && <ArrowDropDown />}
                {diff === 0 && "• "}
                {Math.abs(diff).toFixed()}
                {percentage && "%"}
            </span>
        );
    }

    return (
        <StyledMetricPage>
            <div className="topStats">
                <div className="item">
                    <p className="label">Total Hackers</p>
                    <p className="data">
                        {metrics.hackers}
                        {data.allYears[yearId] &&
                            getDifference(metrics.hackers, data.allYears[yearId].metrics.hackers)}
                    </p>
                </div>
                <div className="item">
                    <p className="label">Total Projects</p>
                    <p className="data">
                        {metrics.projects}
                        {data.allYears[yearId] &&
                            getDifference(metrics.projects, data.allYears[yearId].metrics.projects)}
                    </p>
                </div>
                <Tooltip
                    arrow
                    title="Hackers who have never been to a Hacklahoma event, regardless of how many hackathons they've attended."
                >
                    <div className="item">
                        <p className="label">First Hacklahomie</p>
                        <p className="data">
                            {((0 / metrics.hackers) * 100).toFixed()}%{" "}
                            {data.allYears[yearId] &&
                                getDifference(
                                    (0 / metrics.hackers) * 100,
                                    (0 / data.allYears[yearId].metrics.hackers) * 100,
                                    true
                                )}
                        </p>
                    </div>
                </Tooltip>
                <div className="item">
                    <p className="label">First Hackathon</p>
                    <p className="data">
                        {((metrics.firstTimeHackers / metrics.hackers) * 100).toFixed()}%
                        {data.allYears[yearId] &&
                            getDifference(
                                (metrics.firstTimeHackers / metrics.hackers) * 100,
                                (data.allYears[yearId].metrics.firstTimeHackers /
                                    data.allYears[yearId].metrics.hackers) *
                                    100,
                                true
                            )}
                    </p>
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
                    {metrics.levelOfStudy_N !== metrics.hackers && (
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
                    )}
                    {/* LEVEL OF STUDY */}
                    {metrics.levelOfStudy_N !== metrics.hackers && (
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
                    )}
                    {/* Diet */}
                    <PieGraph
                        title="Diet"
                        subtitle={`${(
                            ((metrics.diet_VT +
                                metrics.diet_VE +
                                metrics.diet_L +
                                metrics.diet_G +
                                metrics.diet_NA +
                                metrics.diet_H +
                                metrics.diet_K +
                                metrics.diet_O) /
                                metrics.hackers) *
                            100
                        ).toFixed()}% of hackers have restrictions`}
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
