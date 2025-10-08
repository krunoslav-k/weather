import type { WeatherData, ForecastData } from "../../types/weather";
import styles from "./WeeklyForecast.module.scss";
import weatherImage from "../../assets/icons/rainy-icon.png";
import { getIconSrc } from "../../utils/icons";

interface WeeklyForecastProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
}

interface DailyForecastData {
  date?: string;
  weekDay?: string;
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

export default function WeeklyForecast({ forecastData }: WeeklyForecastProps) {
  function dateKeyFromItem(item: WeatherData, timezoneOffsetSeconds = 0) {
    const dateInMiliseconds = (item.dt ?? 0 + timezoneOffsetSeconds) * 1000;
    const date = new Date(dateInMiliseconds);

    const dd = String(date.getUTCDate()).padStart(2, "0");
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yyyy = String(date.getUTCFullYear());

    return `${dd}.${mm}.${yyyy}`;
  }

  function groupByDate(list: WeatherData[]): ForecastDataByDate {
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
      byDate[dateKey].descriptions.push(item.weather[0].main);
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

  function aggregateDaily(byDate: ForecastDataByDate) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Object.entries(byDate).map(([date, data]) => {
      const weekDay = days[new Date(date).getUTCDay()];

      const minTemp = Math.round(Math.min(...data.temps));
      const maxTemp = Math.round(Math.max(...data.temps));

      const sumHumidity = data.humidities.reduce((sum, value) => {
        return sum + value;
      }, 0);
      const avgHumidity = Math.round(sumHumidity / data.humidities.length);

      const totalRain = data.rains.reduce((sum, value) => {
        return sum + value;
      }, 0);

      const sumWind = data.winds.reduce((sum, value) => {
        return sum + value;
      }, 0);
      const avgWind = Math.round(sumWind / data.winds.length);

      const dominantWeather = getMostFrequent(data.descriptions);
      const icon = getMostFrequent(data.icons);

      return {
        weekDay,
        date,
        minTemp,
        maxTemp,
        avgHumidity,
        totalRain: Number(totalRain.toFixed(1)),
        avgWind,
        description: dominantWeather,
        icon,
      };
    });
  }

  return (
    <div className={styles.weeklyForecast}>
      {aggregateDaily(groupByDate(forecastData.list)).map((day) => {
        return (
          <div className={styles.dayCard} key={day.date}>
            <div className={styles.dayCardHeader}>
              <p className={styles.dayCardDate}>{day.date.slice(0, 6)}</p>
              <p className={styles.dayCardWeekday}>{day.weekDay}</p>
            </div>

            <img
              className={styles.dayCardIcon}
              src={getIconSrc(day.icon) ?? weatherImage}
              alt="weather icon"
            />

            <div className={styles.dayCardDetails}>
              <p className={styles.dayCardTemp}>
                {day.maxTemp}°C{" "}
                <span className={styles.minTemp}>{day.minTemp}°C</span>
              </p>
              <p className={styles.dayCardDescription}>{day.description}</p>
              <p className={styles.dayCardParametar}>
                Precipitation: {day.totalRain}mm
              </p>
              <p className={styles.dayCardParametar}>Wind: {day.avgWind}m/s</p>
              <p className={styles.dayCardParametar}>
                Humidity: {day.avgHumidity}%
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
