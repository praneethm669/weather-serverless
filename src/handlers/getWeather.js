const got = require('got');

async function getWeather(event, context) {

  console.log(event.queryStringParameters.zip);

  const zip = event.queryStringParameters.zip;

  const response = await got(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=b9d8502288bbe640ecf8a5c8c0d96616&units=imperial`, {
    https: {
      rejectUnauthorized: true
    }
  });
  console.log(response);
  const parsedRes = JSON.parse(response.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      Temp: `Current Temperature is : ${(parsedRes.main.temp)}`,
      Zipcode: `Zipcode is ${zip}`
    })
  };
}

export const handler = getWeather;


