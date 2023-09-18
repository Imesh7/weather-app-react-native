import axios from 'axios';
import {CurrentLocationWeather} from '../../../models/CurrentLocationWeather';

async function FetchCurrentLocationWeather({lat, lon}) {
  try {
    //https://openweathermap.org/api/one-call-3
    console.log(' lat ' + lat + ' lon ' + lon);
    const apiResult = await axios.get<CurrentLocationWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=71079e2703c2c212abf25c7490c04215`,
    );

    console.log(apiResult.data);
    return apiResult.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default FetchCurrentLocationWeather;
