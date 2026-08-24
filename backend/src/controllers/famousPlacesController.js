import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getFamousPlaces = async (req, res) => {
  const { lat, lon } = req.body;

  try {
    // Validate coordinates
    if (lat === undefined || lon === undefined) {
      return res.status(400).json({
        error: "Latitude and longitude are required.",
      });
    }
    console.log(process.env.FOURSQUARE_BEARER_KEY);
    const response = await axios.get(
      "https://places-api.foursquare.com/places/search",
      {
        params: {
          ll: `${lat},${lon}`,
          radius: 10000,
          categories: "16000",
          sort: "POPULARITY",
          limit: 10,
        },

        headers: {
          "X-Places-Api-Version": "2025-06-17",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.FOURSQUARE_BEARER_KEY}`,
        },
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Foursquare API error:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      error: "Failed to fetch famous places.",
    });
  }
};

export const getPlacesImages = async (req, res) => {
  const { placeName } = req.body;
  try {
    const response = await axios.get(
      "https://commons.wikimedia.org/w/api.php",
      {
        params: {
          action: "query",
          generator: "search",
          gsrsearch: placeName.trim(),
          gsrnamespace: 6,
          gsrlimit: 5,
          prop: "imageinfo",
          iiprop: "url",
          iiurlwidth: 800,
          format: "json",
        },
        headers: {
          "User-Agent": "TripPlanner/1.0 (your-email@example.com)",
        },
      },
    );
    const pages = response.data.query?.pages || {};

    const images = Object.values(pages)
      .map((page) => {
        const imageInfo = page.imageinfo?.[0];

        return {
          title: page.title,
          imageUrl: imageInfo?.thumburl || imageInfo?.url || null,
        };
      })
      .filter((image) => image.imageUrl);

    return res.status(200).json(images);
  } catch (error) {
    console.error(
      "Wikimedia Commons API error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      error: "Failed to fetch places images.",
    });
  }
};

export const getDestinationImages = async (req, res) => {
  const { destination } = req.body;
    console.log("Fetching images for destination:", destination);
  try {
    if (!destination?.trim()) {
      return res.status(400).json({
        error: "Destination is required.",
      });
    }

    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: destination,
          per_page: 10,
          orientation: "landscape",
        },
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    const images = response.data.photos.map((photo) => ({
      id: photo.id,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      imageUrl: photo.src.large2x,
      originalUrl: photo.src.original,
      alt: photo.alt,
      pexelsUrl: photo.url,
    }));

    return res.status(200).json(images);
  } catch (error) {
    console.error(
      "Pexels API error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "Failed to fetch destination images.",
    });
  }
};
