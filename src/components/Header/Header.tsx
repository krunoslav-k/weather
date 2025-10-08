import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { CityOption } from "../../types/cities";
import styles from "./Header.module.scss";
import { MapPin } from "lucide-react";

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
    <div className={styles.header}>
      <h1 className={styles.logo}>WEATHER</h1>
      <SearchBar onCityChange={handleOnCityChange} />
      {location ? (
        <p className={styles.city}>
          <MapPin className={styles.cityIcon} />
          {location}
        </p>
      ) : (
        <p className={styles.city}></p>
      )}
    </div>
  );
}
