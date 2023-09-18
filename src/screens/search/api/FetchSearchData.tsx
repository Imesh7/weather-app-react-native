import axios from 'axios';
import {CurrentLocationWeather} from '../../../models/CurrentLocationWeather';

export const FetchSearchLocations = async (city: string) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=71079e2703c2c212abf25c7490c04215`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const FetchSelectedLocationWeather = async ({lat, lon}) => {
  try {
    const apiResult = await axios.get<CurrentLocationWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=71079e2703c2c212abf25c7490c04215`,
    );

    console.log(apiResult.data);
    return apiResult.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
