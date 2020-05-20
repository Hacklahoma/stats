var http = require("http"); //importing http

function keepAwake() {
    setInterval(function() {
        var options = {
            host: "hacklahoma-stats.herokuapp.com",
            port: 80,
            path: "/",
        };
        http.get(options, function(res) {
            res.on("data", function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("Ping!");
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on("error", function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

module.exports = keepAwake;
