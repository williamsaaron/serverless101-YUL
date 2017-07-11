# Setup:

* Create new space in BlueMix; set namespace and auth
* Create new Slack team
* Clear the repo

# Tabs Open:

* https://github.com/williamsaaron/serverless101-YUL
* https://console.bluemix.net/openwhisk/?env_id=ibm:yp:us-south
* Slack window to new team

--------------

Hello World

* wsk
* view hello.js
* wsk action list
* wsk action create hello hello.js
* wsk action list
* wsk action invoke --blocking hello
  * view activationID
  * view duration
* wsk action invoke --blocking hello
  * view duration
* wsk activation get <ID>

Update Hello World

* edit hello.js
* wsk action update hello hello.js
* wsk action invoke --blocking hello
  * view duration

Delete Hello World

* wsk list
* wsk action delete hello
* wsk list

Simple Weather Conditions

* view weather.js
* wsk action create weather weather.js
* wsk action invoke --blocking --result weather
* wsk action invoke -b -r weather --param location "San Francisco, CA"
* wsk activation list
* wsk activation get <ID>
  * view duration

Enable Weather Web Action

* Chrome: Manage OpenWhisk; weather action; develop view; monitor
* enable Web Action
* click Web Action URL
* add ?location=Abadan
* back to Chrome: invoke in browser; view log

Weather Forecast from Lat Long Function

* Chrome: Add Weather Company Data service
* view forecast_from_latlong.js
* wsk action create forecast_from_latlong forecast_from_latlong.js
* wsk action invoke forecast_from_latlong -b -r -p lat "45.50" -p lng "-73.56" -p username _user_ -p password _pw_
* wsk action update forecast_from_latlong forecast_from_latlong.js -p _user_ -p password _pw_
* wsk action invoke forecast_from_latlong -b -r -p lat "45.50" -p lng "-73.56"

Lat Long from Location Function

* view latlong_from_location.js
* wsk action create latlong_from_location latlong_from_location.js
* wsk action invoke latlong_from_location -b -r -p text "Montreal" -p key _GoogleAPIKey_
* wsk action update latlong_from_location latlong_from_location.js -p key _GoogleAPIKey_
* wsk action invoke latlong_from_location -b -r -p text "Montreal"

Post to Slack Function

* wsk list
* wsk package list
* wsk package list /whisk.system
* wsk package get --summary /whisk.system/slack
* Chrome: view Slack channel; Apps and Integrations; Incoming Webhook; create; copy URL
* wsk action invoke /whisk.system/slack/post -p channel weather -p text "Hello" -p url _WebHookURL_
  * view Slack channel
* wsk action create --copy post_to_slack /whisk.system/slack/post -p channel weather -p username "Weather Bot" -p icon_emoji "/:sun_with_face/:" -p url _WebHookURL_
* wsk action invoke post_to_slack -p text "Hello again"
  * view Slack channel

Sequence of Three Actions

* wsk action create slack_from_location --sequence latlong_from_location,forecast_from_latlong,post_to_slack
* wsk action invoke slack_from_location -b -p text "Montreal"
  * view Slack channel
* wsk action update slack_from_location --web true

Setup Slack to Post to Sequence Action

* manage OpenWhisk; slack_from_location action; copy web action URL
* view Slack channel; Apps and Integrations; outgoing Webhook; set trigger word forecast; add URL; create
* Slack: forecast Montreal



