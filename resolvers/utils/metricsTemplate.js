/* eslint-disable quote-props */

/**
 * Object that contains the stats we acquire
 */
const metricsTemplate = {
  general: {
    'hackers':          0,
    'projects':         0,
    'firstTimeHackers': 0,
  },
  gender: {
    'male':       0,
    'female':     0,
    'non-binary': 0,
    'n':          0,
  },
  race: {
    'white/caucasian':                   0,
    'asian/pacific islander':            0,
    'hispanic':                          0,
    'black or african american':         0,
    'american indian or alaskan native': 0,
    'n':                                 0,
  },
  levelOfStudy: {
    'high school':              0,
    'tech school':              0,
    'undergraduate university': 0,
    'graduate university':      0,
    'n':                        0,
  },
  diet: {
    'vegetarian':  0,
    'vegan':       0,
    'lactose':     0,
    'gluten':      0,
    'nut allergy': 0,
    'halal':       0,
    'kosher':      0,
    'other':       0,
    'n':           0,
  },
  shirt: {
    'x-small':  0,
    'small':    0,
    'medium':   0,
    'large':    0,
    'x-large':  0,
    'xx-large': 0,
    'n':        0,
  },
  major: {
    'arts':                 [],
    'business':             [],
    'health':               [],
    'interdisciplinary':    [],
    'publicSocialServices': [],
    'compTech':             [],
    'stem':                 [],
    'socialSciences':       [],
    'trades':               [],
    'other':                [],
  },
  graduationYear: {
    'freshman':  0,
    'sophomore': 0,
    'junior':    0,
    'senior':    0,
  },
};

module.exports = metricsTemplate;
