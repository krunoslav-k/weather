export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainData {
  temp: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WindData {
  speed: number;
  deg?: number;
  gust?: number;
}

export interface RainData {
  "1h"?: number;
  "3h"?: number;
}

export interface CloudsData {
  all: number;
}

export interface SysData {
  sunrise: number;
  sunset: number;
  country?: string;
  type?: number;
  id?: number;
}

export interface WeatherData {
  weather: WeatherCondition[];
  main: MainData;
  wind: WindData;
  rain?: RainData;
  clouds: CloudsData;
  sys: SysData;
  dt?: number;
  name?: string;
  visibility?: number;
  timezone?: number;
  id?: number;
}
