import axios from "axios";

export const searchLocation = async (req, res) => {
  const { query } = req.body;

  try {
    if (!query?.trim()) {
      return res.status(400).json({
        error: "Search query is required.",
      });
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query.trim(),
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          "User-Agent": "TripPlanner/1.0",
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({
        error: "Location not found.",
      });
    }

    console.log(response.data);

    return res.status(200).json(response.data[0]);
  } catch (error) {
    console.error(
      "Nominatim error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "An error occurred while searching for the location.",
    });
  }
};