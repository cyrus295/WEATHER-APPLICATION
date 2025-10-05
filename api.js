import axios from "axios";


const API_KEY = "444d1acdcfe29b6e9de1d655102df2e1"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
