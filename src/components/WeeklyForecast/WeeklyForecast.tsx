import type { WeatherData, ForecastData } from "../../types/weather";
import styles from "./WeeklyForecast.module.scss";

interface WeeklyForecastProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
}

interface DailyForecastData {
  temps: number[];
  rains: number[];
  winds: number[];
  humidities: number[];
  descriptions: string[];
  icons: string[];
}

interface ForecastDataByDate {
  [date: string]: DailyForecastData;
}

export default function WeeklyForecast({
  weatherData,
  forecastData,
}: WeeklyForecastProps) {
  function dateKeyFromItem(item: WeatherData, timezoneOffsetSeconds = 0) {
    const dateInMiliseconds = (item.dt ?? 0 + timezoneOffsetSeconds) * 1000;
    const date = new Date(dateInMiliseconds);

    const dd = String(date.getUTCDate()).padStart(2, "0");
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yyyy = String(date.getUTCFullYear());

    return `${dd}.${mm}.${yyyy}`;
  }

  function groupByDate(list: WeatherData[], timezoneOffsetSeconds = 0) {
    const byDate: ForecastDataByDate = {};

    list.forEach((item) => {
      const dateKey = dateKeyFromItem(item);

      if (!byDate[dateKey]) {
        byDate[dateKey] = {
          temps: [],
          rains: [],
          winds: [],
          humidities: [],
          descriptions: [],
          icons: [],
        };
      }

      byDate[dateKey].temps.push(item.main.temp);
      byDate[dateKey].rains.push(item.rain?.["3h"] ?? 0);
      byDate[dateKey].winds.push(item.wind.speed ?? 0);
      byDate[dateKey].humidities.push(item.main.humidity);
      byDate[dateKey].descriptions.push(item.weather[0].description);
      byDate[dateKey].icons.push(item.weather[0].icon);
    });

    return byDate;
  }

  function getMostFrequent(array: string[]): string {
    const frequencies: Record<string, number> = {};

    array.forEach((item) => (frequencies[item] = (frequencies[item] || 0) + 1));

    return Object.keys(frequencies).reduce((a, b) =>
      frequencies[a] >= frequencies[b] ? a : b
    );
  }

  return (
    <div className={styles.weeklyForecast}>
      <div className={styles.dayCard}>
        <div className={styles.dayCardHeader}>
          <p className={styles.dayCardDate}></p>
          <p className={styles.dayCardWeekday}></p>
        </div>

        <img className={styles.dayCardIcon} src="" alt="" />

        <div className={styles.dayCardDetails}>
          <p className={styles.dayCardTemp}></p>
          <p className={styles.dayCardDescription}></p>
          <p className={styles.dayCardParametar}>Precipitation:</p>
          <p className={styles.dayCardParametar}>Wind:</p>
          <p className={styles.dayCardParametar}>Humidity:</p>
        </div>
      </div>
    </div>
  );
}
