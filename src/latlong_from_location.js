var request = require("request");

// Requires a text location.
// Returns lat / long for that location.
function main(params) {
    // If the location is not there, reject.
    if (!params.text) return Promise.reject("Missing location text");
    if (!params.key) return Promise.reject("Missing Google API key");

    // Build the JSON for the request to Google.
    var options = {
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        qs: {address: params.text, key: params.key},
        json: true
    };

    // Use a promise to get the lat / long asynchronously from Google.
    return new Promise(function (resolve, reject) {
        request(options, function (err, resp) {
            if (err) { return reject({err: err}) }
            if (resp.body.status !== "OK") { return reject({err: resp.body.status})             }
            resolve(resp.body.results[0].geometry.location);
        });
    });
};
