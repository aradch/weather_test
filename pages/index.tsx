import React from "react";
import styles from "./main.module.css";
import Link from "next/link";
import MainPageContent from "../components/MainPageContent";
import ButtonContainer from "../components/ButtonContainer";
import { getWeather } from "../api/getWeatherData";

type PropsType = {
  error?: string;
  data?: WeatherForecastResponseTypes[];
};

const MainPage = ({ data, error }: PropsType) => {
  const [activeCity, setActiveCity] = React.useState<string>("Minsk");

  React.useEffect(() => {
    if (!data) {
      setActiveCity("Error");
    } else {
      const lastActiveCity: string | null = localStorage.getItem("currentCity");
      const test = JSON.stringify({ data });
      localStorage.setItem("weather", test);
      setActiveCity(lastActiveCity ? lastActiveCity : data[0].location.name);
    }
  }, []);

  const citiesElements = data?.map(
    (city: WeatherForecastResponseTypes, index: number) => (
      <MainPageContent
        key={city.location.name}
        isActive={activeCity === city.location.name}
        data={city}
        index={index}
      />
    )
  );

  const buttonsElements = data?.map(
    (city: WeatherResponseTypes, index: number) => (
      <ButtonContainer
        key={index}
        setActiveCity={setActiveCity}
        isActive={activeCity === city.location.name}
        value={city.location.name}
      />
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.buttonsBlock}>{buttonsElements}</div>

      {citiesElements}
      {activeCity === "Error" && <div>Server Error: {error}</div>}
    </div>
  );
};

export default MainPage;

export async function getStaticProps() {
  const weather = getWeather();
  return weather;
}

export enum City {
  Minsk = "Minsk",
  Moscow = "Moscow",
  Bratislava = "Bratislava",
}

export type WeatherResponseTypes = {
  location: LocationType;
  current: CurrentWeatherType;
};

export type WeatherForecastResponseTypes = {
  location: LocationType;
  current: CurrentWeatherType;
  forecast: ForecastDayType;
};

type ForecastDayType = {
  forecastday: DayWeatherType[];
};

type LocationType = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

type CurrentWeatherType = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

export type DayWeatherType = {
  astro: AstroWeatherType;
  date: string;
  date_epoch: number;
  day: DayType;
  hour: HourWeatherType[];
};

type AstroWeatherType = {
  moon_illumination?: string;
  moon_phase?: string;
  moonrise?: string;
  moonset?: string;
  sunrise?: string;
  sunset?: string;
  date?: string;
  date_epoch?: number;
};

type DayType = {
  avghumidity: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: ConditionType;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  mintemp_c: number;
  mintemp_f: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  uv: number;
};

type ConditionType = {
  text: string;
  icon: string;
  code: number;
};

export type HourWeatherType = {
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: ConditionType;
  dewpoint_c: number;
  dewpoint_f: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  will_it_rain: number;
  will_it_snow: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
};
