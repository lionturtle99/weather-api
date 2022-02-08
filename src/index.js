import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {WeatherService, ChuckNorris} from './js/business.js';

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
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    let unit = $("input:radio[name=temp]:checked").val();
    
    let promise = WeatherService.getWeather(city, unit);
    promise.then(function(response) {
      const body = JSON.parse(response);
      clearFields();
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showClouds').text(`The cloudiness in ${city} is ${body.clouds.all}%`);
      $('.showF').text(`The temperature in ${city} in ${unit} is ${body.main.temp}`);
      $('.showWeather').text(`The weather in ${city} is ${body.weather[0].main}`);
      $("#showWind").text(`The wind in ${city} is ${body.wind.deg}`);
      $("#showSpeed").text(`The wind in ${city} is ${body.wind.speed}`);
    }, function(error) {
      clearFields();
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });

  $('#joke').click(function() {
    let promise = ChuckNorris.makeAJoke();
    promise.then(function(response) {
      const body = JSON.parse(response);
      clearFields();
      $('.showJoke').text(`Joke: ${body.value}`);
    });
  });
});