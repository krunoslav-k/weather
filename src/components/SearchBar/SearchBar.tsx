import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../services/cityAPI";
import type { CityOption, CitiesAPIResponse } from "../../types/cities";
import { customStyles } from "./SearchBarStyle";
import SearchIconPlaceholder from "./SearchIconPlaceholder";

interface SearchBarProps {
  onCityChange: (city: CityOption | null) => void;
}

export default function SearchBar({ onCityChange }: SearchBarProps) {
  const [city, setCity] = useState<CityOption | null>(null);

  function handleOnChange(cityData: CityOption | null) {
    setCity(cityData);
    onCityChange(cityData);
    console.log(cityData);
  }

  function loadOptions(inputValue: string): Promise<{ options: CityOption[] }> {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=80000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response: CitiesAPIResponse) => {
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
        components={{ Placeholder: SearchIconPlaceholder }}
        debounceTimeout={600}
        value={city}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
}
