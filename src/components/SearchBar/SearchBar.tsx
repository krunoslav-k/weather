import { useState } from "react";
import { AsyncPaginate, type Response } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../services/cityAPI";

export default function SearchBar({ onCityChange }) {
  const [city, setCity] = useState(null);

  function handleOnChange(cityData) {
    setCity(cityData);
    onCityChange(cityData);
    console.log(cityData);
  }

  function loadOptions(inputValue) {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=80000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      })
      .catch((err) => {
        console.error(err);
        return { options: [] };
      });
  }

  return (
    <div>
      <AsyncPaginate
        placeholder="search for a city"
        debounceTimeout={600}
        value={city}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}
