/**
 * Remove a year and all of it's helper objects
 */
const removeYear = async (_, { id }) => {
  const { keystone } = require('../index.js');

  // Getting all ids associated with year before removal
  const year = await keystone.executeQuery(`
    query {
      Year(where: { id: ${id} }) {
        id
        metrics {
          id
          majors {
            id
          }
        }
      }
    }
  `);

  // Remove year
  await keystone.executeQuery(`
    mutation {
      deleteYear(id: ${id}) {
        id
      }
    }
  `);

  // Remove metric
  await keystone.executeQuery(`
    mutation {
      deleteMetric(id: ${year.data.Year.metrics.id}) {
        id
      }
    }
  `);

  const majorIds = year.data.Year.metrics.majors.map((obj) => obj.id);

  // Remove majors
  await keystone.executeQuery(`
    mutation {
      deleteMajors(ids: ${JSON.stringify(majorIds)}) {
        id
      }
    }
  `);

  return year;
};

module.exports = removeYear;
