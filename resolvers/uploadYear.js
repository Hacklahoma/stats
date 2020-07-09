/* eslint-disable camelcase */
const { parse } = require('papaparse');
const metricsTemplate = require('./utils/metricsTemplate');
const helpers = require('./utils/helpers');

/**
 * Creates a new year with all of the hacker data
 */
const uploadYear = async (_, { year, projects, data }) => {
  const { keystone } = require('../index.js');

  // Create a deep copy of metrics
  const metrics = JSON.parse(JSON.stringify(metricsTemplate));

  // Check to make sure the year isn't already being used
  const yearCheck = await keystone.executeQuery(`
    query {
      allYears(where:{year:${year}}) {
        year
      }
    }
  `);

  // Log any errors
  if (yearCheck.errors) {
    throw new Error(yearCheck.errors[0].message);
  }

  // Check to see if any years were returned from query
  if (yearCheck.data.allYears.length > 0) {
    throw new Error('Year is currently already being used.');
  }

  // Create the initial year
  const yearData = await keystone.executeQuery(`
    mutation {
      createYear(data:{
        year: ${year},
      }) {
        id year
      }
    }
  `);

  // Log any errors
  if (yearData.errors) {
    throw new Error(yearData.errors[0].message);
  }

  // Parse the data
  const hackerData = parse(data, {
    complete(results) {
      return results;
    },
    header: true,
  });

  // General attributes that don't need to be included in loop
  metrics.general.hackers = hackerData.data.length;
  metrics.general.projects = projects;

  // Go through the hacker data and parse it all
  Object.values(hackerData.data).forEach((hacker) => {
    helpers.populateFirstTimeHackers(metrics, hacker);
    helpers.populateMajors(metrics, hacker);
    helpers.populateIndependents(metrics.gender, hacker.gender);
    helpers.populateIndependents(metrics.race, hacker.race);
    helpers.populateIndependents(metrics.levelOfStudy, hacker.levelOfStudy);
    helpers.populateIndependents(metrics.diet, hacker.diet);
    helpers.populateIndependents(metrics.shirt, hacker.shirt);
  });

  console.log("Here is your upload report! Make sure you look for any keys that aren't supposed to be there, this means that the parser found something that didn't match the templated keys.");
  console.log(metrics);

  // Create the metrics
  const metricData = await keystone.executeQuery(`
    mutation {
      updateYear(
        id: ${yearData.data.createYear.id},
        data: {
          metrics: {
            create: {
              parent: {connect:{id:"${yearData.data.createYear.id}"}}
              hackers: ${metrics.general.hackers},
              firstTimeHackers: ${metrics.general.firstTimeHackers},
              projects: ${metrics.general.projects},
              gender_F: ${metrics.gender.female}, 
              gender_M: ${metrics.gender.male},
              gender_NB: ${metrics.gender['non-binary']},
              gender_N: ${metrics.gender.n},
              race_WC: ${metrics.race['white/caucasian']},
              race_API: ${metrics.race['asian/pacific islander']},
              race_H: ${metrics.race.hispanic},
              race_BAA: ${metrics.race['black or african american']},
              race_AIAN: ${metrics.race['american indian or alaskan native']},
              race_N: ${metrics.race.n},
              levelOfStudy_HS: ${metrics.levelOfStudy['high school']},
              levelOfStudy_TS: ${metrics.levelOfStudy['tech school']},
              levelOfStudy_UU: ${metrics.levelOfStudy['undergraduate university']},
              levelOfStudy_GU: ${metrics.levelOfStudy['graduate university']},
              levelOfStudy_N: ${metrics.levelOfStudy.n},
              diet_VT: ${metrics.diet.vegetarian},
              diet_VE: ${metrics.diet.vegan},
              diet_L: ${metrics.diet.lactose},
              diet_G: ${metrics.diet.gluten},
              diet_NA: ${metrics.diet['nut allergy']},
              diet_H: ${metrics.diet.halal},
              diet_K: ${metrics.diet.kosher},
              diet_O: ${metrics.diet.other},
              diet_N: ${metrics.diet.n},
              shirt_XS: ${metrics.shirt['x-small']},
              shirt_S: ${metrics.shirt.small},
              shirt_M: ${metrics.shirt.medium},
              shirt_L: ${metrics.shirt.large},
              shirt_XL: ${metrics.shirt['x-large']},
              shirt_XXL: ${metrics.shirt['xx-large']},
            }
          }
        }
      ) {
        year
        metrics { 
          id
          parent {year}
          hackers
          projects
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
          firstTimeHackers
          uniqueHackers
        }
      }
    }
  `);

  // Log any errors
  if (metricData.errors) {
    throw new Error(metricData.errors[0].message);
  }

  // Update the metrics by adding the majors
  await keystone.executeQuery(`
    mutation{
      updateMetric(
        id: ${metricData.data.updateYear.metrics.id},
        data: {
          majors: {
            create: [
              {   
                type: "Arts and Humanities",
                raw: "${metrics.major.arts.join(',')}",
                quantity: ${metrics.major.arts.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Business",
                raw: "${metrics.major.business.join(',')}",
                quantity: ${metrics.major.business.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Health and Medicine",
                raw: "${metrics.major.health.join(',')}",
                quantity: ${metrics.major.health.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Multi/Interdisciplinary Studies",
                raw: "${metrics.major.interdisciplinary.join(',')}",
                quantity: ${metrics.major.interdisciplinary.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Public and Social Services",
                raw: "${metrics.major.publicSocialServices.join(',')}",
                quantity: ${metrics.major.publicSocialServices.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "STEM",
                raw: "${metrics.major.stem.join(',')}",
                quantity: ${metrics.major.stem.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Computer Technologies",
                raw: "${metrics.major.compTech.join(',')}",
                quantity: ${metrics.major.compTech.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Social Sciences",
                raw: "${metrics.major.socialSciences.join(',')}",
                quantity: ${metrics.major.socialSciences.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Trades and Personal Services",
                raw: "${metrics.major.trades.join(',')}",
                quantity: ${metrics.major.trades.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Other",
                raw: "${metrics.major.other.join(',')}",
                quantity: ${metrics.major.other.length},
                parent: {connect:{id:"${metricData.data.updateYear.metrics.id}"}}
              },
            ]
          },
        }
      ) {
        majors {
          type 
          raw
        }
      }
    }
  `);

  return yearData.data.createYear;
};

module.exports = uploadYear;
