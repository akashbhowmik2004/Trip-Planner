import {Router} from "express";
import { getWeatherDetails } from "../controllers/weatherController.js";

const router = Router();

router.post("/get-weather", getWeatherDetails);

export default router;