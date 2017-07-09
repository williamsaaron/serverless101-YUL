var request = require("request");

// Requires a lat / long and credentials for the Weather Company service.
// Returns text with the forecast.
function main(params) {

    // If any of the required params are not there, reject.
    if (!params.lat) return Promise.reject("Missing latitude");
    if (!params.lng) return Promise.reject("Missing longitude");
    if (!params.username || !params.password) return Promise.reject("Missing credentials");

    // The URL for requesting the forecast.
    var url = "https://twcservice.mybluemix.net/api/weather/v1/geocode/";
    url += params.lat+"/"+params.lng+"/forecast/daily/3day.json";

    // Construct the JSON for the request to the Weather Company service.
    var options = {
        url: url,
        json: true,
        auth: {
            user: params.username,
            password: params.password
        }
    };

    // Use a Promise to get the forecast asynchronously.
    return new Promise(function (resolve, reject) {
        request(options, function (err, resp) {
            if (err) { return reject({err: err}) }
            resolve({text: resp.body.forecasts[0].narrative});
        });
    });
}
