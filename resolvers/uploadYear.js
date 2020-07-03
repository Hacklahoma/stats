/* eslint-disable camelcase */
const { parse } = require('papaparse');
const { keystone } = require('../index.js');

// Major Keywords
const ARTS_KEYWORDS = [
  'arts',
  'art',
  'ballet',
  'crafts',
  'dance',
  'film',
  'documentary',
  'music',
  'photography',
  'theater',
  'performing',
];
const BUSINESS_KEYWORDS = [
  'business',
  'accounting',
  'human resources',
];
const HEALTH_KEYWORDS = [
  'health',
  'medicine',
  'nursing',
];
const INTERDISCIPLINARY_KEYWORDS = [
  'gender',
  'family',
  'liberal',
  'recreation',
  'fitness',
];
const PUBLIC_SOCIAL_SERVICES_KEYWORDS = [
  'law',
  'prelaw',
  'legal',
  'court',
  'public',
  'social',
  'services',
  'community',
];
const STEM_KEYWORDS = [
  'math',
  'mathematics',
  'engineering',
  'data',
  'science',
  'statistics',
  'biochemistry',
  'physics',
  'biology',
  'microbiology',
];
const COMP_TECH_KEYWORDS = [
  'software',
  'computer',
  'tech',
  'technology',
  'systems',
];
const SOCIAL_SCIENCES_KEYWORDS = [
  'education',
  'psychology',
  'history',
  'library',
  'sociology',
];
const TRADES_KEYWORDS = [
  'construction',
  'mechanic',
  'culinary',
  'production',
  'transportation',
];

/**
 * Creates a new year with all of the hacker data
 */
const uploadYear = async (_, { year, projects, data }) => {
  // Check to make sure the year isn't already being used
  const yearCheck = await keystone.executeQuery(`
    query {
      allYears(where:{year:${year}}) {
        year
      }
    }
  `);

  // Check to see if any years were returned from query
  if (yearCheck.data.allYears.length > 0) {
    throw new Error('Year is currently already being used.');
  }

  // Get the previously added years
  const prevYearsData = await keystone.executeQuery(`
    query{
      allYears(
        orderBy: "year" 
      ){
        year 
        metrics{ id uniqueHackers }
      }
    }
  `);

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

  // Parse the data
  const hackerData = parse(data, {
    complete(results) {
      return results;
    },
    header: true,
  });

  let gender_F = 0;
  let gender_M = 0;
  let gender_NB = 0;
  let gender_N = 0;
  let race_WC = 0;
  let race_API = 0;
  let race_H = 0;
  let race_BAA = 0;
  let race_AIAN = 0;
  let race_N = 0;
  let levelOfStudy_HS = 0;
  let levelOfStudy_TS = 0;
  let levelOfStudy_UU = 0;
  let levelOfStudy_GU = 0;
  let levelOfStudy_N = 0;
  let diet_VT = 0;
  let diet_VE = 0;
  let diet_L = 0;
  let diet_G = 0;
  let diet_NA = 0;
  let diet_H = 0;
  let diet_K = 0;
  let diet_O = 0;
  let diet_N = 0;
  let shirt_XS = 0;
  let shirt_S = 0;
  let shirt_M = 0;
  let shirt_L = 0;
  let shirt_XL = 0;
  let shirt_XXL = 0;
  let firstTimeHackers = 0;
  const uniqueHackers = [];
  const rawArts = [];
  const rawBusiness = [];
  const rawHealth = [];
  const rawInterdisciplinary = [];
  const rawPublicSocialServices = [];
  const rawSTEM = [];
  const rawCompTech = [];
  const rawSocialSciences = [];
  const rawTrades = [];
  const rawOther = [];

  // Go through the hacker data and parse it all
  hackerData.data.keys((i) => {
    // Switch statement for gender
    switch (hackerData.data[i].gender) {
      case 'Male':
        gender_M++;
        break;
      case 'Female':
        gender_F++;
        break;
      case 'Non-binary':
        gender_NB++;
        break;
      default:
        gender_N++;
    }

    // Switch statement for races
    switch (hackerData.data[i].race) {
      case 'White/Caucasian':
        race_WC++;
        break;
      case 'Asian/Pacific Islander':
        race_API++;
        break;
      case 'Hispanic':
        race_H++;
        break;
      case 'Black or African American':
        race_BAA++;
        break;
      case 'American Indian or Alaskan Native':
        race_AIAN++;
        break;
      default:
        race_N++;
    }

    // Switch statement for level of study
    switch (hackerData.data[i].levelOfStudy) {
      case 'High School':
        levelOfStudy_HS++;
        break;
      case 'Tech School':
        levelOfStudy_TS++;
        break;
      case 'Undergraduate University':
        levelOfStudy_UU++;
        break;
      case 'Graduate University':
        levelOfStudy_GU++;
        break;
      default:
        levelOfStudy_N++;
    }

    // Switch statement for diet
    switch (hackerData.data[i].diet) {
      case 'Vegetarian':
        diet_VT++;
        break;
      case 'Vegan':
        diet_VE++;
        break;
      case 'Lactose':
        diet_L++;
        break;
      case 'Gluten':
        diet_G++;
        break;
      case 'Nut Allergy':
        diet_NA++;
        break;
      case 'Halal':
        diet_H++;
        break;
      case 'Kosher':
        diet_K++;
        break;
      case 'Other':
        diet_O++;
        break;
      default:
        diet_N++;
    }

    // Switch statement for shirt size
    switch (hackerData.data[i].shirt) {
      case 'X-Small':
        shirt_XS++;
        break;
      case 'Small':
        shirt_S++;
        break;
      case 'Medium':
        shirt_M++;
        break;
      case 'Large':
        shirt_L++;
        break;
      case 'X-Large':
        shirt_XL++;
        break;
      case 'XX-Large':
        shirt_XXL++;
        break;
      default:
        break;
    }

    if (hackerData.data[i].major.length > 0) {
      // store majors into a variable
      let majors = hackerData.data[i].major;

      // First check if the hacker has more than one major
      if (hackerData.data[i].major.indexOf(',') > -1) {
        // Split majors up by commas
        majors = majors.split(', ');
      } else {
        // store major into an array
        majors = majors.split();
      }
      // Loop through the one or more majors a stuend may have
      majors.keys((k) => {
        // Split majors at spaces
        const major = majors[k].split(' ');

        // Loop through each word looking for keywords
        major.keys((j) => {
          if (ARTS_KEYWORDS.includes(major[j].toLowerCase())) {
            rawArts.push(majors[k]);
          } else if (BUSINESS_KEYWORDS.includes(major[j].toLowerCase())) {
            rawBusiness.push(majors[k]);
          } else if (HEALTH_KEYWORDS.includes(major[j].toLowerCase())) {
            rawHealth.push(majors[k]);
          } else if (INTERDISCIPLINARY_KEYWORDS.includes(major[j].toLowerCase())) {
            rawInterdisciplinary.push(majors[k]);
          } else if (PUBLIC_SOCIAL_SERVICES_KEYWORDS.includes(major[j].toLowerCase())) {
            rawPublicSocialServices.push(majors[k]);
          } else if (COMP_TECH_KEYWORDS.includes(major[j].toLowerCase())) {
            rawCompTech.push(majors[k]);
          } else if (STEM_KEYWORDS.includes(major[j].toLowerCase())) {
            rawSTEM.push(majors[k]);
          } else if (SOCIAL_SCIENCES_KEYWORDS.includes(major[j].toLowerCase())) {
            rawSocialSciences.push(majors[k]);
          } else if (TRADES_KEYWORDS.includes(major[j].toLowerCase())) {
            rawTrades.push(majors[k]);
          } else if (j >= +major.length - +1) {
            rawOther.push(majors[k]);
          }
        });
      });
    }

    // Check to see if the hacker is a first time hacker
    if (hackerData.data[i].hackathons === '0') {
      firstTimeHackers++;
    }

    // Add the hacker email to the list of emails if the email field isn't blank
    if (hackerData.data[i].email.length > 0) {
      uniqueHackers.push(hackerData.data[i].email);
    }
  });

  // Check to see if there are any previous added years
  if (prevYearsData.data.allYears.length > 0) {
    const prevYears = [];
    // Get all the emails from the previous added years
    prevYearsData.data.allYears.keys((i) => {
      prevYears.push({
        year: prevYearsData.data.allYears[i].year,
        metricId: prevYearsData.data.allYears[i].metrics.id,
        uniqueHackers: prevYearsData.data.allYears[i].metrics.uniqueHackers.split(','),
      });
    });

    // Go through email array
    uniqueHackers.keys((i) => {
      // Go through previous added years checking for hacker emails
      prevYears.keys((j) => {
        // Check to see if the email matches
        if (prevYears[j].uniqueHackers.includes(uniqueHackers[i])) {
          // Check the different cases a year may have
          // If the year being added is less than the current previously added year
          if (+year < +prevYears[j].year) {
            // Splice the year from the previously added year
            prevYears[j].uniqueHackers.splice(
              prevYears[j].uniqueHackers.indexOf(uniqueHackers[i]),
              1,
            );
          } else {
            // Splice the year from the year being added
            uniqueHackers.splice(i, 1);
          }
        }
      });
    });

    // Update previous years metrics
    prevYears.keys((i) => {
      keystone.executeQuery(`
        mutation {
          updateMetric(
            id: ${prevYears[i].metricsId},
            data: {
                uniqueHackers: ${prevYears[i].uniqueHackers.join(',')},
            }
          ){
            uniqueHackers
          }
        }
      `);
    });
  }

  // Create the metrics
  const metrics = await keystone.executeQuery(`
    mutation {
      updateYear(
        id: ${yearData.data.createYear.id},
        data: {
          metrics: {
            create: {
              parent: {connect:{id:"${yearData.data.createYear.id}"}}
              hackers: ${hackerData.data.length},
              projects: ${projects},
              gender_F: ${gender_F}, 
              gender_M: ${gender_M},
              gender_NB: ${gender_NB},
              gender_N: ${gender_N},
              race_WC: ${race_WC},
              race_API: ${race_API},
              race_H: ${race_H},
              race_BAA: ${race_BAA},
              race_AIAN: ${race_AIAN},
              race_N: ${race_N},
              levelOfStudy_HS: ${levelOfStudy_HS},
              levelOfStudy_TS: ${levelOfStudy_TS},
              levelOfStudy_UU: ${levelOfStudy_UU},
              levelOfStudy_GU: ${levelOfStudy_GU},
              levelOfStudy_N: ${levelOfStudy_N},
              diet_VT: ${diet_VT},
              diet_VE: ${diet_VE},
              diet_L: ${diet_L},
              diet_G: ${diet_G},
              diet_NA: ${diet_NA},
              diet_H: ${diet_H},
              diet_K: ${diet_K},
              diet_O: ${diet_O},
              diet_N: ${diet_N},
              shirt_XS: ${shirt_XS},
              shirt_S: ${shirt_S},
              shirt_M: ${shirt_M},
              shirt_L: ${shirt_L},
              shirt_XL: ${shirt_XL},
              shirt_XXL: ${shirt_XXL},
              firstTimeHackers: ${firstTimeHackers},
              uniqueHackers: "${uniqueHackers.join(',')}",
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

  // Update the metrics by adding the majors
  await keystone.executeQuery(`
    mutation{
      updateMetric(
        id: ${metrics.data.updateYear.metrics.id},
        data: {
          majors: {
            create: [
              {   
                type: "Arts and Humanities",
                raw: "${rawArts.join(',')}",
                quantity: ${rawArts.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Business",
                raw: "${rawBusiness.join(',')}",
                quantity: ${rawBusiness.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Health and Medicine",
                raw: "${rawHealth.join(',')}",
                quantity: ${rawHealth.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Multi/Interdisciplinary Studies",
                raw: "${rawInterdisciplinary.join(',')}",
                quantity: ${rawInterdisciplinary.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Public and Social Services",
                raw: "${rawPublicSocialServices.join(',')}",
                quantity: ${rawPublicSocialServices.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "STEM",
                raw: "${rawSTEM.join(',')}",
                quantity: ${rawSTEM.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Computer Technologies",
                raw: "${rawCompTech.join(',')}",
                quantity: ${rawCompTech.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Social Sciences",
                raw: "${rawSocialSciences.join(',')}",
                quantity: ${rawSocialSciences.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Trades and Personal Services",
                raw: "${rawTrades.join(',')}",
                quantity: ${rawTrades.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
              },
              {   
                type: "Other",
                raw: "${rawOther.join(',')}",
                quantity: ${rawOther.length},
                parent: {connect:{id:"${metrics.data.updateYear.metrics.id}"}}
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
