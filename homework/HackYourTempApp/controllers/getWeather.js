import { json } from "express";
import fetch from "node-fetch";
import keys from "../sources/keys.js";

export const getWeather = async (req, res) => {
  const { cityName } = req.body;

  if (cityName) {
    try {
      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`
      );
      const weatherData = await responseWeather.json();
      res.render("home", {
        cityData: {
          temperature:
            (weatherData.main.temp - 273.5).toFixed(2) +
            String.fromCharCode(176),
          cityName: weatherData.name,
          currentTime: new Date(weatherData.dt),
          description: weatherData.weather[0].description,
        },
      });
    } catch (err) {
      res.status(404).render("home", {
        error: "Please provide Valid City name",
      });
    }
  } else {
    res.status(404).render("home", {
      error: "Please provide a City name",
    });
  }
};
