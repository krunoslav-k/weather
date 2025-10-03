import styles from "./CurrentWeather.module.scss";
import weatherImage from "../../assets/icons/rainy-icon.png";
import { CloudRain, Droplet, Sun, Wind } from "lucide-react";

export default function CurrentWeather() {
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

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Current Weather</p>

      <div className={styles.dateTimeWrapper}>
        <p className={styles.dateTime}>{getCurrentDate()}</p>
        <p className={styles.dateTime}>{getCurrentTime()}</p>
      </div>

      <div className={styles.heroWrapper}>
        <img className={styles.heroImage} src={weatherImage} alt="" />
        <div className={styles.heroInfoWrapper}>
          <p className={styles.heroTemperature}>12°C</p>
          <p className={styles.heroDescription}>CLOUDY</p>
        </div>
      </div>

      <div className={styles.parametarWrapper}>
        <div className={styles.parametar}>
          <CloudRain className={styles.parametarIcon} />
          <p className={styles.parametarValue}>163mm</p>
        </div>
        <div className={styles.parametar}>
          <Droplet className={styles.parametarIcon} />
          <p className={styles.parametarValue}>92%</p>
        </div>
        <div className={styles.parametar}>
          <Wind className={styles.parametarIcon} />
          <p className={styles.parametarValue}>6km/h</p>
        </div>
        <div className={styles.parametar}>
          <Sun className={styles.parametarIcon} />
          <p className={styles.parametarValue}>2</p>
        </div>
      </div>
    </div>
  );
}
