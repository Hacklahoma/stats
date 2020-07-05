/* eslint-disable no-console */
const http = require('http'); // importing http

/**
 * TODO
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
