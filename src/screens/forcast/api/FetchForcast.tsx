import axios from 'axios';

export const FetchDailyForcast = async () => {
  try {
    const response = await axios.get(
      'http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&appid=71079e2703c2c212abf25c7490c04215',
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const FetchTodayForcast = async () => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=71079e2703c2c212abf25c7490c04215',
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
