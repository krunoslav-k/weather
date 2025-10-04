import styles from "./DailyForecast.module.scss";
import { Tabs } from "radix-ui";

export default function DailyForecast() {
  return (
    <div className={styles.container}>
      <Tabs.Root defaultValue="temperature">
        <Tabs.List aria-label="choose a weather parametar">
          <Tabs.Trigger value="temperature">Temperature</Tabs.Trigger>
          <Tabs.Trigger value="percipitation">Percipitation</Tabs.Trigger>
          <Tabs.Trigger value="wind">Wind</Tabs.Trigger>
          <Tabs.Trigger value="humidity">Humidity</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="temperature">
          <div className={styles.hourlyForecast}>
            <p className={styles.hourlyForecastTime}></p>
            <img className={styles.hourlyForecastIcon} src="" alt="" />
            <p className={styles.hourlyForecastParametarValue}></p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="percipitation">
          <div className={styles.hourlyForecast}>
            <p className={styles.hourlyForecastTime}></p>
            <img className={styles.hourlyForecastIcon} src="" alt="" />
            <p className={styles.hourlyForecastParametarValue}></p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="wind">
          <div className={styles.hourlyForecast}>
            <p className={styles.hourlyForecastTime}></p>
            <img className={styles.hourlyForecastIcon} src="" alt="" />
            <p className={styles.hourlyForecastParametarValue}></p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="humidity">
          <div className={styles.hourlyForecast}>
            <p className={styles.hourlyForecastTime}></p>
            <img className={styles.hourlyForecastIcon} src="" alt="" />
            <p className={styles.hourlyForecastParametarValue}></p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
