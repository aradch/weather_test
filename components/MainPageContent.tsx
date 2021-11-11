import React from "react";
import styles from "../pages/main.module.css";
import Link from "next/link";
import Image from "next/image";
import { WeatherForecastResponseTypes, HourWeatherType } from "../pages";
import { HourWeatherCard } from "../components/WeatherCard";

type PropsType = {
  data: WeatherForecastResponseTypes;
  isActive: boolean;
  index: number;
};

const MainPageContent = ({ data, isActive, index }: PropsType) => {
  const timeWeatherElements = data.forecast.forecastday[0].hour.map(
    (hour: HourWeatherType) => (
      <HourWeatherCard
        key={`${hour.time}${hour.temp_c}`}
        time={hour.time}
        icon={hour.condition.icon}
        feelslike={hour.feelslike_c}
        temperature={hour.temp_c}
      />
    )
  );

  return (
    <>
      {isActive && (
        <div className={`${styles.weatherCards} `}>
          <div className={styles.todayWeatherCard}>
            <Link href={`/${data.location.name}/`}>
              <button className={`${styles.button} ${styles.showMore}`}>
                Show more
              </button>
            </Link>
            <h2>{data.location.name}</h2>
            <span>Time: {data.location.localtime.slice(11)}</span>
            <img src={`https:${data.current.condition.icon}`} />
            <span>Temperature: {data.current.temp_c} &#176;С</span>
            <span>Feels like: {data.current.feelslike_c} &#176;С</span>
          </div>

          <div className={styles.forecastWeatherBlock}>
            <h3>Today weather</h3>
            <div>{timeWeatherElements}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPageContent;
