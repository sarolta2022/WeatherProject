const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.cityName); //name of the input
  const query = req.body.cityName;
  const apiKey = "fab7856e7dacac7abe0dcb9574a299c4";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      //convert data into js object
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>the temperature in ${query} is ${temp} degress celsius</h1>`
      );
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
