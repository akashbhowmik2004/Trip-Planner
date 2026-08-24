import express from "express";
import cors from "cors";
import countryRoutes from "./src/Routes/countryRoutes.js";
import weatherRoutes from "./src/Routes/weatherRoutes.js";
import placesRoutes from "./src/Routes/placesRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/countries", countryRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/places", placesRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});