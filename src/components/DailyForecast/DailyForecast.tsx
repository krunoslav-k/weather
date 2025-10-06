import styles from "./DailyForecast.module.scss";
import { ScrollArea, Tabs } from "radix-ui";
import weatherImage from "../../assets/icons/rainy-icon.png";
import { getIconSrc } from "../../utils/icons";
import type { FormattedForecast, WeatherData } from "../../types/weather";
import type { CityOption } from "../../types/cities";
import { CloudRain, Droplet, Thermometer, Wind } from "lucide-react";

interface forecastData {
  city: CityOption;
  cnt: number;
  cod: string;
  list: WeatherData[];
}

interface DailyForecastProps {
  forecastData: forecastData;
  weatherData: WeatherData;
}

export default function DailyForecast({
  forecastData,
  weatherData,
}: DailyForecastProps) {
  if (!forecastData) return;

  function getFormattedData(): FormattedForecast[] {
    const formattedData: FormattedForecast[] = [];
    forecastData.list.slice(0, 30).map((data) => {
      formattedData.push({
        time: data.dt_txt.substring(11, 13),
        icon: getIconSrc(weatherData.weather[0].icon),
        temp: Math.round(data.main.temp),
        rain: data.rain?.["1h"] ? data.rain?.["1h"] : 0,
        wind: Math.round(data.wind.speed),
        humidity: data.main.humidity,
      });
    });

    console.log(forecastData);

    return formattedData;
  }

  getFormattedData();

  return (
    <div className={styles.container}>
      <Tabs.Root className={styles.tabRoot} defaultValue="temperature">
        <Tabs.List
          className={styles.tabList}
          aria-label="choose a weather parametar"
        >
          <Tabs.Trigger className={styles.tab} value="temperature">
            <Thermometer className={styles.tabIcon} /> Temperature
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tab} value="percipitation">
            <CloudRain className={styles.tabIcon} /> Percipitation
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tab} value="wind">
            <Wind className={styles.tabIcon} /> Wind
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tab} value="humidity">
            <Droplet className={styles.tabIcon} /> Humidity
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="temperature">
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <div className={styles.inner}>
                {getFormattedData()
                  .slice(0, 30)
                  .map((data, index) => {
                    return (
                      <div className={styles.hourlyForecast} key={index}>
                        <p className={styles.hourlyForecastTime}>
                          {data.time}h
                        </p>
                        <img
                          className={styles.hourlyForecastIcon}
                          src={data.icon ?? weatherImage}
                          alt=""
                        />
                        <p className={styles.hourlyForecastParametarValue}>
                          {data.temp}°C
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
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <div className={styles.inner}>
                {getFormattedData()
                  .slice(0, 30)
                  .map((data, index) => {
                    return (
                      <div className={styles.hourlyForecast} key={index}>
                        <p className={styles.hourlyForecastTime}>
                          {data.time}h
                        </p>
                        <img
                          className={styles.hourlyForecastIcon}
                          src={data.icon ?? weatherImage}
                          alt=""
                        />
                        <p className={styles.hourlyForecastParametarValue}>
                          {data.rain}mm
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

        <Tabs.Content value="wind">
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <div className={styles.inner}>
                {getFormattedData()
                  .slice(0, 30)
                  .map((data, index) => {
                    return (
                      <div className={styles.hourlyForecast} key={index}>
                        <p className={styles.hourlyForecastTime}>
                          {data.time}h
                        </p>
                        <img
                          className={styles.hourlyForecastIcon}
                          src={data.icon ?? weatherImage}
                          alt=""
                        />
                        <p className={styles.hourlyForecastParametarValue}>
                          {data.wind}km/h
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

        <Tabs.Content value="humidity">
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              <div className={styles.inner}>
                {getFormattedData()
                  .slice(0, 30)
                  .map((data, index) => {
                    return (
                      <div className={styles.hourlyForecast} key={index}>
                        <p className={styles.hourlyForecastTime}>
                          {data.time}h
                        </p>
                        <img
                          className={styles.hourlyForecastIcon}
                          src={data.icon ?? weatherImage}
                          alt=""
                        />
                        <p className={styles.hourlyForecastParametarValue}>
                          {data.humidity}%
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
      </Tabs.Root>
    </div>
  );
}
