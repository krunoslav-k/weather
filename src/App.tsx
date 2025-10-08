import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Header from "./components/Header/Header";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./services/weatherAPI";
import type { CityOption } from "./types/cities";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import CityMap from "./components/CityMap/CityMap";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function handleShowWeather(cityData: CityOption | null) {
    if (!cityData) return;

    const [lat, lon] = cityData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: cityData.label, ...weatherResponse });
        setForecast({ city: cityData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }
  console.log(currentWeather);

  return (
    <>
      <Header showWeather={handleShowWeather}></Header>

      {currentWeather && forecast && (
        <>
          <div className="top-container">
            <CurrentWeather weatherData={currentWeather}></CurrentWeather>

            <CityMap
              lat={currentWeather.coord.lat}
              lon={currentWeather.coord.lon}
              city={currentWeather.city}
            ></CityMap>
          </div>

          <DailyForecast
            forecastData={forecast}
            weatherData={currentWeather}
          ></DailyForecast>

          <WeeklyForecast
            forecastData={forecast}
            weatherData={currentWeather}
          ></WeeklyForecast>
        </>
      )}
    </>
  );
}

export default App;
