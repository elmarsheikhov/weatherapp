import React from "react";
import bgImage from "../../img/sky.jpg";
import { API_KEY } from "../../constants";
import "./Home.css";
export const Home = () => {
  const [city, setCity] = React.useState("");
  const [forecast, setForecast] = React.useState(false);

  const WEATHER_API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

  let time = forecast?.current?.last_updated;
  let day = forecast?.forecast?.forecastday[0]?.date;
  let icon = forecast?.current?.condition.icon;
  let cityName = forecast?.location?.name;
  let countryName = forecast?.location?.country;
  let temp = forecast?.current?.temp_c;
  let humidity = forecast?.current?.humidity;
  let windSpeed = forecast?.current?.wind_kph;
  let weatherCase = forecast?.current?.condition.text;

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(WEATHER_API)
      .then((response) => response.json())
      .then((data) => {
        setForecast(data);
      })
      .catch((error) => {
        setForecast(false);
        console.log("elmar" + error);
      });
  };
  console.log(forecast?.error);

  const formatDate = (dateString) => {
    const options = { weekday: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className="main_container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="weather_container">
        <h3 className="text-center">Weather Forecast</h3>
        <form onSubmit={handleSubmit} className="text-center">
          {" "}
          <input
            className="search_input form-control w-75"
            placeholder="Enter a City ..."
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit" className="show_btn ">
            Show
          </button>
          <div>{forecast?.error && <div>Enter correct city name</div>}</div>
        </form>
      </div>
      {forecast && !forecast?.error && (
        <div className="forecast d-flex flex-column justify-content-center align-items-center">
          <div className=" p-3 m-3 d-flex align-items-center gap-5">
            <div>
              <img className="today_img" src={icon} />
            </div>
            <div className="today_forecast">
              <div className="mb-3">Today</div>
              <h2 className="fw-bold">{cityName}</h2>
              <div>Temperature: {temp}°C</div>
              <div>{weatherCase}</div>
            </div>
          </div>
          <div className=" d-flex ">
            {forecast.forecast.forecastday.slice(1, -2).map((item, key) => (
              <div className="forecast_day p-3 m-3 d-flex flex-column justify-content-center align-items-center">
                <h4>{formatDate(item.date)}</h4>
                <img
                  className="forecast_day_img"
                  src={item.day.condition.icon}
                />
                <div className="fs-3">{item.day.avgtemp_c}°C</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
