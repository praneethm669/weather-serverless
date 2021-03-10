# build
npm install

# deployment steps 
sls deploy -v

# api endpoints

## Get the weather of specific zipcode area
https://n8juz4ku8f.execute-api.eu-west-1.amazonaws.com/dev/getWeather?zip={zip}

## Fetch the report data from dynamo db
https://n8juz4ku8f.execute-api.eu-west-1.amazonaws.com/dev/getWeatherReport 

example:
https://n8juz4ku8f.execute-api.eu-west-1.amazonaws.com/dev/getWeather?zip=94040
