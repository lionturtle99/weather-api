import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weatherService.js';
import ChuckNorris from './js/jokeService.js';
import GiphyService from './js/giphyService.js';

function clearFields() {
  $('#location').val("");
  $(".showErrors").text("");
  $('.showHumidity').text("");
  $('.showClouds').text("");
  $('.showF').text("");
  $('.showWeather').text("");
  $("#showWind").text("");
  $("#showSpeed").text("");
  $('.showJoke').text("");
  $("#gif").text("");
}

function weatherDescription(response, description, query, unit) {
  $('.weather-description').text(`The weather is ${description}!`);
  $('.showHumidity').text(`The humidity in ${query} is ${response.main.humidity}%`);
  $('.showClouds').text(`The cloudiness in ${query} is ${response.clouds.all}%`);
  $('.showF').text(`The temperature in ${query} in ${unit} is ${response.main.temp}`);
  $('.showWeather').text(`The weather in ${query} is ${response.weather[0].main}`);
  $("#showWind").text(`The wind in ${query} is ${response.wind.deg}`);
  $("#showSpeed").text(`The wind in ${query} is ${response.wind.speed}`);
}

function displayGif(response) {
  const url = response.data[0].images.downsized.url;
  $(".show-gif").html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.showErrors').text(`${error}`)
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const query = $('#location').val();
    const unit = $("input:radio[name=temp]:checked").val();
    const gif = $("#gif").val();
    clearFields();
    
    WeatherService.getWeather(query, unit)
      .then(function(weatherResponse) {
        if(weatherResponse instanceof Error) {
          throw Error(`OpenWeather API error: ${weatherResponse.message}`);
        }
        const description = weatherResponse.weather[0].description;
        weatherDescription(weatherResponse, description, query, unit);
        if (gif === "") {
          return GiphyService.getGif(description);
        } else {
          return GiphyService.getGif(gif);
        }
      })
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      }).then(function() {

      })
      .catch(function(error) {
        displayErrors(error.message);
      })
  });
  $('#joke').click(function() {
    let promise = ChuckNorris.makeAJoke();
    promise.then(function(response) {
      const body = JSON.parse(response);
      clearFields();
      $('.showJoke').text(`Joke: ${body.value}`);
    })
  });
});

  //   let promise = WeatherService.getWeather(, unit);
  //   promise.then(function(response) {
  //     const body = JSON.parse(response);
  //     clearFields();

  //   }, function(error) {
  //     clearFields();
  //     $('.showErrors').text(`There was an error processing your request: ${error}`);
  //   });
  // });