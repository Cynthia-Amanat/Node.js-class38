import fetch from "node-fetch";
import keys from "../sources/keys.js";

export const getWeather = async (req, res) => {
  const { cityName } = req.body;
  const responseWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`
  );
  const weatherData = await responseWeather.json();
  if (!cityName) {
    res.status(400).json({ message: "Opp Please enter Valid city name " });
  } else {
    console.log(weatherData);
    res.render("home", { cityData: weatherData });
  }
};
