const express = require('express');
const https = require ('https');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "8634d60e676a885d1cefd0413601a2e8";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      //weather is an array of objects, only has one object
      res.write("<h1>The weather in " + query + " right now is " + temp + " degrees Fahrenheit</h1>");
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<img src=" +imgURL + ">");
      res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("Server has started running on port 3000!");
});
