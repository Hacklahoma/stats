/* eslint-disable no-console */
const http = require('http'); // importing http

/**
 * Function to keep heroku app awake. Currently this pings the
 * hacklahoma-stats.herokuapp.com domain every 20 minutes. Keep this until we
 * find a better hosting solution, but while we have the free plan of heroku we
 * need to keep this to keep it awake.
 */
function keepAwake() {
  setInterval(() => {
    const options = {
      host: 'hacklahoma-stats.herokuapp.com',
      port: 80,
      path: '/',
    };
    http.get(options, (res) => {
      res.on('data', () => {
        try {
          // optional logging... disable after it's working
          console.log('Ping!');
        } catch (err) {
          console.log(err.message);
        }
      });
    }).on('error', (err) => {
      console.log(`Error: ${err.message}`);
    });
  }, 20 * 60 * 1000); // load every 20 minutes
}

module.exports = keepAwake;
