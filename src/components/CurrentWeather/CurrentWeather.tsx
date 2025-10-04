import styles from "./CurrentWeather.module.scss";
import weatherImage from "../../assets/icons/rainy-icon.png";
import { CloudRain, Droplet, Sun, Wind } from "lucide-react";
import { getIconSrc } from "../../utils/icons";
import type { WeatherData } from "../../types/weather";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
}

export default function CurrentWeather({ weatherData }: CurrentWeatherProps) {
  function getCurrentDate(): string {
    const today: Date = new Date();

    const days: string[] = ["ned", "pon", "uto", "sri", "čet", "pet", "sub"];

    const dayName: string = days[today.getDay()];
    const day: string = today.getDate().toString().padStart(2, "0"); // npr. 03
    const month: string = (today.getMonth() + 1).toString().padStart(2, "0"); // getMonth() 0-11
    const year: number = today.getFullYear();

    const formattedDate = `${dayName} ${day}.${month}.${year}`;

    return formattedDate;
  }

  function getCurrentTime(): string {
    const now: Date = new Date();
    const hours: string = now.getHours().toString().padStart(2, "0");
    const minutes: string = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function estimateUV(
    weatherData: WeatherData,
    currentTime: Date = new Date()
  ): number {
    const { clouds, sys } = weatherData;
    const sunrise = new Date(sys.sunrise * 1000);
    const sunset = new Date(sys.sunset * 1000);

    if (currentTime < sunrise || currentTime > sunset) return 0;

    const dayDuration = sunset.getTime() - sunrise.getTime();
    const timeSinceSunrise = currentTime.getTime() - sunrise.getTime();
    let baseUV = (timeSinceSunrise / dayDuration) * 10;

    baseUV *= 1 - clouds.all / 100;

    return Math.round(Math.min(Math.max(baseUV, 0), 11));
  }

  return weatherData ? (
    <div className={styles.container}>
      <p className={styles.heading}>Current Weather</p>

      <div className={styles.dateTimeWrapper}>
        <p className={styles.dateTime}>{getCurrentDate()}</p>
        <p className={styles.dateTime}>{getCurrentTime()}</p>
      </div>

      <div className={styles.heroWrapper}>
        <img
          className={styles.heroImage}
          src={getIconSrc(weatherData.weather[0].icon) ?? weatherImage}
          alt=""
        />
        <div className={styles.heroInfoWrapper}>
          <p className={styles.heroTemperature}>
            {Math.round(weatherData.main.temp)}
            <span className={styles.degree}>°C</span>
          </p>
          <p className={styles.heroDescription}>
            {weatherData.weather[0].description}
          </p>
        </div>
      </div>

      <div className={styles.parametarWrapper}>
        <div className={styles.parametar}>
          <CloudRain className={styles.parametarIcon} />
          <p className={styles.parametarValue}>
            {weatherData.rain?.["1h"] ? weatherData.rain?.["1h"] : 0}mm
          </p>
        </div>

        <div className={styles.parametar}>
          <Droplet className={styles.parametarIcon} />
          <p className={styles.parametarValue}>{weatherData.main.humidity}%</p>
        </div>

        <div className={styles.parametar}>
          <Wind className={styles.parametarIcon} />
          <p className={styles.parametarValue}>
            {weatherData.wind.speed ? Math.round(weatherData.wind.speed) : 0}
            km/h
          </p>
        </div>

        <div className={styles.parametar}>
          <Sun className={styles.parametarIcon} />
          <p className={styles.parametarValue}>{estimateUV(weatherData)}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
