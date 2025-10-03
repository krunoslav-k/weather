import { WEATHER_API_KEY, WEATHER_API_URL } from "../../services/weatherAPI";
import SearchBar from "../SearchBar/SearchBar";
import type { CityOption } from "../SearchBar/SearchBar";
import { useState } from "react";

export default function Header() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function handleOnCityChange(cityData: CityOption | null) {
    const [lat, lon] = cityData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: cityData.label, ...weatherResponse });
        setForecast({ city: cityData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

    console.log(currentWeather);
    console.log(forecast);
  }

  return (
    <>
      <h1>Weather</h1>
      <SearchBar onCityChange={handleOnCityChange} />
      <p>city placeholder</p>
    </>
  );
}
