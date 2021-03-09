import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const got = require('got');
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getWeather(event, context) {

  const now = new Date();

  console.log(event.queryStringParameters.zip);

  const zip = event.queryStringParameters.zip;

  const response = await got(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=b9d8502288bbe640ecf8a5c8c0d96616&units=imperial`, {
    https: {
      rejectUnauthorized: true
    }
  });
  console.log(response);
  const parsedRes = JSON.parse(response.body);
  const weatherReport = {
    id: uuid(),
    temp: `${(parsedRes.main.temp)}`,
    zipcode: `${zip}`,
    requestedAt: now.toISOString().slice(0, 10),
  };

  await dynamodb.put({
    TableName: 'WeatherTable',
    Item: weatherReport,
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(weatherReport),
  };
}

export const handler = getWeather;


