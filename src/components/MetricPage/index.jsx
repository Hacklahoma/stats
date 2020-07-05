import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import 'chartjs-plugin-datalabels';
import Grid from '@material-ui/core/Grid';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { useEffect } from 'react';
import PieGraph from './MetricChildren/PieGraph';
import LineGraph from './MetricChildren/LineGraph';
import { defaultMetrics } from './utils';

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
      align-items: top;
      font-size: 1.6em;
      font-weight: bold;
      position: relative;

      .quiet {
        font-size: 0.8em;
        font-weight: normal;
      }

      .difference {
        color: #aaa;
        font-size: 0.5em;
        font-weight: normal;
        margin-left: 6px;
        position: absolute;
        top: 2.5px;

        svg {
          margin-bottom: -8px;
          margin-right: -5px;
        }

        &.up {
          color: green;
          margin-left: 0;
          top: 0;
        }

        &.down {
          color: red;
          margin-left: 0;
          top: 0;
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
 * Query's overall metrics from DB
 */
const OVERALL_METRICS = gql`
    query {
      allYears {
        year
        disabled
        metrics {
          hackers
          projects
          firstTimeHackers
          majors(sortBy: type_ASC) {
            type
            quantity
            raw
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
 * Main page to display metrics for Overall, and year metrics
 *
 * For the future, I would like to make all these calculations
 * through the backend instead.
 *
 * The data populates an object and uses a schema from utils.js called
 * "defaultMetrics". When adding more data, make sure you also update
 * the schema so that it can populate the object properly.
 *
 * @param {*} param0
 */
function MetricPage({ user, yearId }) {
  let metrics = JSON.parse(JSON.stringify(defaultMetrics));
  const timeline = {
    labels: [],
    hackers: [],
    projects: [],
  };
  const { loading, data, refetch } = useQuery(OVERALL_METRICS);

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
  } if (yearId === 0 && data.allYears.length > 0) {
    // Setup first year's majors
    Object.keys(data.allYears[0].metrics.majors).forEach((i) => {
      metrics.majors.types.push(data.allYears[0].metrics.majors[i].type);
      metrics.majors.quantities.push(data.allYears[0].metrics.majors[i].quantity);
      metrics.majors.raw.push(data.allYears[0].metrics.majors[i].raw);
    });

    // Get data for OVERALL data
    Object.keys(data.allYears).forEach((i) => {
      if (!data.allYears[i].disabled) {
        // Settings up timeline
        timeline.labels.push(data.allYears[i].year);
        timeline.hackers.push(data.allYears[i].metrics.hackers);
        timeline.projects.push(data.allYears[i].metrics.projects);

        // Setting up majors, skip first one
        if (i !== '0') {
          Object.keys(data.allYears[i].metrics.majors).forEach((j) => {
            metrics.majors.quantities[j] += data.allYears[i].metrics.majors[j].quantity;
            if (metrics.majors.raw[j].length === 0) {
              metrics.majors.raw[j] += data.allYears[i].metrics.majors[j].raw;
            } else {
              metrics.majors.raw[j] += `,${data.allYears[i].metrics.majors[j].raw}`;
            }
          });
        }

        // Settings up metrics
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
        // Don't count if lost data
        if (data.allYears[i].metrics.race_N !== data.allYears[i].metrics.hackers) {
          metrics.race_N += data.allYears[i].metrics.race_N;
        }
        metrics.levelOfStudy_HS += data.allYears[i].metrics.levelOfStudy_HS;
        metrics.levelOfStudy_TS += data.allYears[i].metrics.levelOfStudy_TS;
        metrics.levelOfStudy_UU += data.allYears[i].metrics.levelOfStudy_UU;
        metrics.levelOfStudy_GU += data.allYears[i].metrics.levelOfStudy_GU;
        // Don't count if lost data
        if (data.allYears[i].metrics.levelOfStudy_N !== data.allYears[i].metrics.hackers) {
          metrics.levelOfStudy_N += data.allYears[i].metrics.levelOfStudy_N;
        }
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
    });
    // Reversing order of timeline
    timeline.labels.reverse();
    timeline.hackers.reverse();
    timeline.projects.reverse();
  } else if (data.allYears[yearId - 1] && !data.allYears[yearId - 1].disabled) {
    // Setup majors
    Object.keys(data.allYears[yearId - 1].metrics.majors).forEach((i) => {
      metrics.majors.types.push(data.allYears[yearId - 1].metrics.majors[i].type);
      metrics.majors.quantities.push(data.allYears[yearId - 1].metrics.majors[i].quantity);
      metrics.majors.raw.push(data.allYears[yearId - 1].metrics.majors[i].raw);
    });

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

  /**
     * Gets the difference and renders it
     *
     * @param {Number} current
     * @param {Number} past
     * @param {Boolean} percentage
     */
  function getDifference(current, past, percentage) {
    if (yearId === 0) return;
    const diff = current - past;
    return (
      <span className={`difference ${diff > 0 && 'up'} ${diff < 0 && 'down'}`}>
        {diff > 0 && <ArrowDropUp />}
        {diff < 0 && <ArrowDropDown />}
        {diff === 0 && '• '}
        {Math.abs(diff).toFixed()}
        {percentage && '%'}
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
            {data.allYears[yearId] && getDifference(
              metrics.hackers,
              data.allYears[yearId].metrics.hackers,
            )}
          </p>
        </div>
        <div className="item">
          <p className="label">Total Projects</p>
          <p className="data">
            {metrics.projects}
            {data.allYears[yearId] && getDifference(
              metrics.projects,
              data.allYears[yearId].metrics.projects,
            )}
          </p>
        </div>
        <div className="item">
          <p className="label">First Hacklahomie</p>
          <p className="data">
            {((0 / metrics.hackers) * 100).toFixed()}%{' '}
            {data.allYears[yearId] && getDifference(
              (0 / metrics.hackers) * 100,
              (0 / data.allYears[yearId].metrics.hackers) * 100,
              true,
            )}
          </p>
        </div>
        <div className="item">
          <p className="label">First Hackathon</p>
          <p className="data">
            {((metrics.firstTimeHackers / metrics.hackers) * 100).toFixed()}%
            {data.allYears[yearId]
              && getDifference(
                (metrics.firstTimeHackers / metrics.hackers) * 100,
                (data.allYears[yearId].metrics.firstTimeHackers
                  / data.allYears[yearId].metrics.hackers)
                * 100,
                true,
              )}
          </p>
        </div>
      </div>
      <div className="graphs">
        <Grid container spacing={3}>
          {/* HACKERS TIMELINE */}
          {yearId === 0 && (
            <LineGraph
              title="Hackers Timeline"
              label="Hackers"
              labels={timeline.labels}
              data={timeline.hackers}
            />
          )}

          {/* PROJECTS TIMELINE */}
          {yearId === 0 && (
            <LineGraph
              title="Projects Timeline"
              label="Projects"
              labels={timeline.labels}
              data={timeline.projects}
            />
          )}

          {/* GENDER */}
          <PieGraph
            title="Gender"
            labels={['Male', 'Female', 'Non-binary', 'Prefer not to answer']}
            data={[
              metrics.gender_M,
              metrics.gender_F,
              metrics.gender_NB,
              metrics.gender_N,
            ]}
          />

          {/* MAJORS */}
          <PieGraph
            title="Majors"
            subtitle="click a slice for more information"
            labels={metrics.majors.types}
            data={metrics.majors.quantities}
            rawMajors={metrics.majors.raw}
          />

          {/* DIVERSITY */}
          {metrics.levelOfStudy_N !== metrics.hackers && (
            <PieGraph
              title="Diversity"
              labels={[
                'White/Caucasian',
                'Asian/Pacific Islander',
                'Hispanic',
                'Black or African American',
                'American Indian or Alaskan Native',
                'Prefer not to answer',
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
                'High School',
                'Tech School',
                'Undergraduate',
                'Graduate',
                'Prefer not to answer',
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
              ((metrics.diet_VT
                + metrics.diet_VE
                + metrics.diet_L
                + metrics.diet_G
                + metrics.diet_NA
                + metrics.diet_H
                + metrics.diet_K
                + metrics.diet_O)
                / metrics.hackers)
              * 100
            ).toFixed()}% of hackers have restrictions`}
            labels={[
              'Vegetarian',
              'Vegan',
              'Lactose',
              'Gluten',
              'Nut Allergy',
              'Halal',
              'Kosher',
              'Other',
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
              labels={['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large']}
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
