import styles from "./DailyForecast.module.scss";
import { ScrollArea, Tabs } from "radix-ui";
import weatherImage from "../../assets/icons/rainy-icon.png";
import { getIconSrc } from "../../utils/icons";

export default function DailyForecast({ forecastData, weatherData }) {
  if (!forecastData) return;

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
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <div className={styles.inner}>
                {forecastData.list.slice(0, 30).map((data, index) => {
                  return (
                    <div className={styles.hourlyForecast} key={index}>
                      <p className={styles.hourlyForecastTime}>{data.dt_txt}</p>
                      <img
                        className={styles.hourlyForecastIcon}
                        src={
                          getIconSrc(weatherData.weather[0].icon) ??
                          weatherImage
                        }
                        alt=""
                      />
                      <p className={styles.hourlyForecastParametarValue}>
                        {data.main.temp}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className={styles.scrollAreaScrollbar}
              orientation="horizontal"
            >
              <ScrollArea.Thumb className={styles.scrollAreaThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
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

  {
    /*
      <div className="aktivno">
        <ScrollArea.Root className={styles.Root}>
          <ScrollArea.Viewport className={styles.Viewport}>
            <div className={styles.Inner}>
              {TAGS.map((tag) => (
                <div className={styles.Tag} key={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            className={styles.Scrollbar}
            orientation="horizontal"
          >
            <ScrollArea.Thumb className={styles.Thumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
   
  );*/
  }
}
