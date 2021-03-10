import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getWeatherReport(event, context) {

  let report;
  //const zip = event.queryStringParameters.zip;


  try {
    const result = await dynamodb.scan({
      TableName: process.env.WEATHER_TABLE_NAME,
    }).promise();
    report = result.Items;
  }
  catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);

  }

  return {
    statusCode: 200,
    body: JSON.stringify(report),
  };
}

export const handler = commonMiddleware(getWeatherReport);

