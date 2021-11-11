import styles from "../pages/main.module.css";

type PropsType = {
  time?: string;
  icon: string;
  temperature?: number;
  feelslike?: number;
  date?: string;
  maxTemperature?: number;
  minTemperature?: number;
};

export const HourWeatherCard = ({
  time,
  icon,
  temperature,
  feelslike,
  date,
  maxTemperature,
  minTemperature,
}: PropsType) => {
  return (
    <>
      <div className={styles.forecastWeather}>
        {time && <span>Time: {time?.slice(11)}</span>}
        {date && <span>Date: {date}</span>}
        <img src={`https:${icon}`} />
        {temperature && <span>Temperature: {temperature} &#176;С</span>}
        {feelslike && <span>Feels like: {feelslike} &#176;С</span>}
        {maxTemperature && (
          <span>Max temperature: {maxTemperature} &#176;С</span>
        )}
        {minTemperature && (
          <span>Min temperature: {minTemperature} &#176;С</span>
        )}
      </div>
    </>
  );
};
