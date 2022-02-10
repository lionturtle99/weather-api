export default class WeatherService {  
  static getWeather(query, unit) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`)
    .then(function(response) {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error;
    });
  }
}

