import React from 'react';
import {City, WeatherForecastResponseTypes} from '../pages/main/index';

type StateType = {
	props: {
		data?: WeatherForecastResponseTypes[]
		error?: string
		fallback: boolean
	}
}

export const getWeather = async (): Promise<StateType> => {

	const days: number = 3;
	const apiKey = '08aee79c24274a1fbd964210212710'
	const BASE_URL: string = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;

	try {
		const minskWeather = await fetch(`${BASE_URL}&q=${City.Minsk}&days=${days}&aqi=no&alerts=no`);
		const moscowWeather = await fetch(`${BASE_URL}&q=${City.Moscow}&days=${days}&aqi=no&alerts=no`);
		const bratislavaWeather = await fetch(`${BASE_URL}&q=${City.Bratislava}&days=${days}&aqi=no&alerts=no`);

		const minskData = await minskWeather.json()
		const moscowData = await moscowWeather.json()
		const bratislavaData = await bratislavaWeather.json()

		return {
			props: {
				data: [minskData, moscowData, bratislavaData],
				fallback: true
			}
		}

	} catch (error) {
		console.log(error)
		return {
			props: {
				error: "Could not load from weather api",
				fallback: true
			}
		}
	}
}
