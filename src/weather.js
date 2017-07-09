var request = require("request");


function main(msg) {

    // Get the location, use Montreal as the default.
    var location = msg.location || "Montreal, QC";

    // The URL from Yahoo to get the Weather info.
    var url = "https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast ";
    url += "where woeid in (select woeid from geo.places(1) where text='" + location + "')&format=json";

    // The call to Yahoo is async, so use a promise.
    return new Promise(function(resolve, reject) {

        // Get the JSON from Yahoo.
        request.get(url, function(error, response, body) {

            // If there were any problems getting the JSON, return the error.
            if (error) { reject(error); }
            else {
                // Otherwise, parse the JSON for the temperature and text.
                var condition = JSON.parse(body).query.results.channel.item.condition;
                var text = condition.text;
                var temperature = condition.temp;
                var output = "It is " + temperature + " degrees in " + location + " and " + text;

                // Log the success.
                console.log(output);

                resolve({msg: output});
            }
        });
    });

}