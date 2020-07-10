/**
 * These are keywords that we look for when categorizing different majors
 */

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

module.exports = {
  ARTS_KEYWORDS,
  BUSINESS_KEYWORDS,
  HEALTH_KEYWORDS,
  INTERDISCIPLINARY_KEYWORDS,
  PUBLIC_SOCIAL_SERVICES_KEYWORDS,
  STEM_KEYWORDS,
  COMP_TECH_KEYWORDS,
  SOCIAL_SCIENCES_KEYWORDS,
  TRADES_KEYWORDS,
};
