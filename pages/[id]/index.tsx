import React from 'react';
import styles from '../main.module.css';
import {useRouter} from 'next/router';
import {HourWeatherCard} from '../../components/WeatherCard';
import {DayWeatherType, WeatherForecastResponseTypes} from '..';

const CityPage = () => {
	const [currentCity, setCurrentCity] = React.useState([])
	const router = useRouter();

	React.useEffect(() => {

		const cities = localStorage.getItem('weather');

		if (cities) {

			const citiesData = JSON.parse(cities)

			const cCity = citiesData.data.filter((item: WeatherForecastResponseTypes) => item.location.name === router.query.id)

			const weaterCards = cCity[0]?.forecast.forecastday.map((day: DayWeatherType, index: number) => <HourWeatherCard
				key={`${index}`}
				minTemperature={day.day.mintemp_c}
				maxTemperature={day.day.maxtemp_c}
				icon={day.day.condition.icon}
				date={day.date}/>
			);

			setCurrentCity(weaterCards)
		}

	}, [])

	const goBack = () => {
		router.push('/');
	}

	return (
		<div className={styles.container}>
			<button className={`${styles.button} ${styles.goBack}`} onClick={goBack}> Go back</button>
			<div className={styles.forecastWeatherBlock}>

				<h2>{router.query.id}</h2>
				<div>
					{currentCity}
				</div>
			</div>
		</div>
	);
};

export default CityPage;
