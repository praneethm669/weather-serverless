async function getWeather(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Welcome to weather app' }),
  };
}

export const handler = getWeather;


