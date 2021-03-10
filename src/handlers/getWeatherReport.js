import AWS from 'aws-sdk';
// import core
import middy from '@middy/core';

// import some middlewares
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
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

export const handler = middy(getWeatherReport)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());

