const PORT = process.env.PORT|| 3000;
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const keys= require("./keeys");



const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let Variables = {
    City: "Delhi"
};

let background = (icon) => {
    if (icon === "01d" || icon === "01n" || icon === "13d" || icon == "13n") return icon;
    else if (icon === "02d" || icon === "03d" || icon === "04d" || icon === "50d") return "02d";
    else if (icon === "09d" || icon === "10d" || icon === "11d") return "09d";
    else if (icon === "02n" || icon === "03n" || icon === "04n" || icon === "50n") return "02n";
    else if (icon === "09n" || icon === "10n" || icon === "11n") return "09n";
};

let calcTime = (offset) => {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (1000 * offset));
    return nd;
}


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("Redirect to /Weather for Weather App");
});

app.get("/Weather", (req, res) => {

    city = "Delhi";
    const APIkey = ps;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

    https.get(url, function (response) {
        console.log(response.statusCode);


        response.on('data', function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const d = calcTime(weatherData.timezone);
            let m = months[d.getMonth()];
            let date = " " + String(d.getDate()) + ", " + String(d.getFullYear());
            let h = (d.getHours() < 10) ? "0" + String(d.getHours()) : String(d.getHours());
            let min = (d.getMinutes() < 10) ? "0" + String(d.getMinutes()) : String(d.getMinutes())
            let s;
            if (weatherData.weather[0].icon.includes("n")) s = "#181e27";
            else s = "#fa6d1b";
            Variables.Temp = Math.round(Number(weatherData.main.temp));
            Variables.ETemp = weatherData.main.temp;
            Variables.Desc = weatherData.weather[0].description;
            Variables.icon = weatherData.weather[0].icon;
            Variables.Country = weatherData.sys.country;
            Variables.FLTemp = weatherData.main.feels_like;
            Variables.MinTemp = weatherData.main.temp_min;
            Variables.MaxTemp = weatherData.main.temp_max;
            Variables.Hum = weatherData.main.humidity;
            Variables.Ws = weatherData.wind.speed;
            Variables.Date = m + date;
            Variables.Time = h + ":" + min;
            Variables.City = weatherData.name;
            Variables.Back = background(weatherData.weather[0].icon);
            Variables.Btn = s;
            Variables.message = "";
            Variables.code = "200"



            res.render("index", Variables);

        });



    });

});

app.get("*", (req, res) => {
    res.send("<h1>404</h1> <p> Page Not Found</p>")
});

app.post("/Weather", (req, res) => {
    let city = req.body.cityName;
    Variables.City = city;
    const APIkey = "c6795b6402b0b688096e938002a02e54";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

    https.get(url, function (response) {
        console.log(response.statusCode);

        if (response.statusCode == 200) {
            response.on('data', function (data) {
                // console.log(data);
                const weatherData = JSON.parse(data);
                // console.log(weatherData);
                const d = calcTime(weatherData.timezone);
                let m = months[d.getMonth()];
                let date = " " + String(d.getDate()) + ", " + String(d.getFullYear());
                let h = (d.getHours() < 10) ? "0" + String(d.getHours()) : String(d.getHours());
                let min = (d.getMinutes() < 10) ? "0" + String(d.getMinutes()) : String(d.getMinutes())
                let s;
                if (weatherData.weather[0].icon.includes("n")) s = "#181e27";
                else s = "#fa6d1b";
                Variables.Temp = Math.round(Number(weatherData.main.temp));
                Variables.ETemp = weatherData.main.temp;
                Variables.Desc = weatherData.weather[0].description;
                Variables.icon = weatherData.weather[0].icon;
                Variables.Country = weatherData.sys.country;
                Variables.FLTemp = weatherData.main.feels_like;
                Variables.MinTemp = weatherData.main.temp_min;
                Variables.MaxTemp = weatherData.main.temp_max;
                Variables.Hum = weatherData.main.humidity;
                Variables.Ws = weatherData.wind.speed;
                Variables.Date = m + date;
                Variables.Time = h + ":" + min;
                Variables.City = weatherData.name;
                Variables.Back = background(weatherData.weather[0].icon);
                Variables.Btn = s;
                Variables.message = "";
                Variables.code="200";
                


                res.render("index", Variables);

            });
        }
        else {

            Variables.City = "-";
            Variables.Temp = "-";
            Variables.ETemp = "-";
            Variables.Desc = "-";
            Variables.icon = "-";
            Variables.Country = "-";
            Variables.FLTemp ="-";
            Variables.MinTemp = "-";
            Variables.MaxTemp = "-";
            Variables.Hum = "-";
            Variables.Ws = "-";
            Variables.Date = "-";
            Variables.Time = "-";
            Variables.City = "-";
            Variables.Back = "-";
            Variables.Btn = "-";
            Variables.code = "-";
            Variables.message = "Invalid!!";
            res.render("index", Variables);
        }

    });
});



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening to ${PORT}`);
});
