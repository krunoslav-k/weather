import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { CityOption } from "../SearchBar/SearchBar";

interface HeaderProps {
  showWeather: (cityData: CityOption | null) => void;
}

export default function Header({ showWeather }: HeaderProps) {
  const [location, setLocation] = useState<string | null>(null);

  function handleOnCityChange(cityData: CityOption | null) {
    showWeather(cityData);
    setLocation(cityData?.label || "");
  }

  return (
    <>
      <h1>Weather</h1>
      <SearchBar onCityChange={handleOnCityChange} />
      <p>{location}</p>
    </>
  );
}
