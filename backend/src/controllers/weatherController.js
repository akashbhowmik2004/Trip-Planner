import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getWeatherDetails = async (req, res) => {
  const { lat, lon } = req.body;

  try {
    console.log("Received coordinates:", { lat, lon });
    if (!lat || !lon) {
      return res.status(400).json({
        error: "Latitude and longitude are required.",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: process.env.OPEN_WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Weather API error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "An error occurred while fetching weather data.",
    });
  }
};