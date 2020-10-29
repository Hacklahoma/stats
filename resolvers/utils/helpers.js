/* eslint-disable no-param-reassign */
const {
  ARTS_KEYWORDS,
  BUSINESS_KEYWORDS,
  HEALTH_KEYWORDS,
  INTERDISCIPLINARY_KEYWORDS,
  PUBLIC_SOCIAL_SERVICES_KEYWORDS,
  COMP_TECH_KEYWORDS,
  STEM_KEYWORDS,
  SOCIAL_SCIENCES_KEYWORDS,
  TRADES_KEYWORDS,
} = require('./keywords');

/**
 * This populates the metrics object where the key matches what the hacker put
 * as their value.
 *
 * @param {object} metrics
 * @param {object} hacker
 */
function populateIndependents(metricSet, key) {
  const keys = key.split(', ');

  Object.values(keys).forEach((val) => {
    if (val.length > 0 && val.toLowerCase() !== 'prefer not to answer') {
      metricSet[val.toLowerCase()]++;
    } else {
      metricSet.n++;
    }
  });
}

/**
 * Called for each individual hacker and checks if they have attended a
 * hackathon and adds it to the metrics.
 *
 * @param {object} metrics
 * @param {object} hacker
 */
function populateFirstTimeHackers(metrics, hacker) {
  if (hacker.hackathons === '0' || hacker.hackathons.length === 0) {
    metrics.general.firstTimeHackers++;
  }
}

/**
 * Called for each individual hacker to locate a keyword
 * within its major and add it to the metrics.
 *
 * @param {object} metrics
 * @param {object} hacker
 */
function populateMajors(metrics, hacker) {
  if (hacker.major.length > 0) {
    let majors = hacker.major;

    // Store hacker's majors into array
    majors = majors.split(', ');

    // Loop through the one or more majors a student may have
    Object.keys(majors).forEach((k) => {
      // Get each individual keyword
      const major = majors[k].split(' ');

      // Tells us if we have found a keyword within major name so we don't add
      // it to multiple categories
      let found = false;

      // Loop through each word looking for keywords
      Object.keys(major).forEach((j) => {
        if (!found) {
          if (ARTS_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.arts.push(majors[k]);
            found = true;
          } else if (BUSINESS_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.business.push(majors[k]);
            found = true;
          } else if (HEALTH_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.business.push(majors[k]);
            found = true;
          } else if (INTERDISCIPLINARY_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.interdisciplinary.push(majors[k]);
            found = true;
          } else if (PUBLIC_SOCIAL_SERVICES_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.publicSocialServices.push(majors[k]);
            found = true;
          } else if (COMP_TECH_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.compTech.push(majors[k]);
            found = true;
          } else if (STEM_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.stem.push(majors[k]);
            found = true;
          } else if (SOCIAL_SCIENCES_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.socialSciences.push(majors[k]);
            found = true;
          } else if (TRADES_KEYWORDS.includes(major[j].toLowerCase())) {
            metrics.major.trades.push(majors[k]);
            found = true;
          } else if (j >= +major.length - +1) {
            metrics.major.other.push(majors[k]);
            found = true;
          }
        }
      });
    });
  }
}

/**
 * Called for each individual hacker to update graduation year values
 * 
 * @param {object} metrics
 * @param {object} hacker
 * @param {object} year
 */
function populateGraduationYear(metrics, hacker, year) {
  //Check to see if there is a graduation year
  //Also check to see if hacker is an undergraduate or in techschool
  if (hacker.graduation && 
    hacker.levelOfStudy === "Undergraduate University" ||
    hacker.levelOfStudy === "Tech School") {
    if (+year + +3 === +hacker.graduation) {
      metrics.graduationYear.freshman++;
    } else if (+year + +2 === +hacker.graduation) {
      metrics.graduationYear.sophomore++;
    } else if (+year + +1 === +hacker.graduation) {
      metrics.graduationYear.junior++;
    } else if (+year === +hacker.graduation) {
      metrics.graduationYear.senior++;
    }
  }
}

module.exports = { populateIndependents, populateFirstTimeHackers, populateMajors, populateGraduationYear };
