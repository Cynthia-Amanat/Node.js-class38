import express from "express";
import { getWeather } from "./controllers/getWeather.js";
import { engine } from "express-handlebars";

export const app = express();
app.use(express.json());
app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Weather App",
  });
});

app.post("/weather", getWeather);
