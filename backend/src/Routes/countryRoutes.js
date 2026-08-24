import {Router} from "express";
import { searchLocation } from "../controllers/countryController.js";

const router = Router();

router.post("/search-location", searchLocation);

export default router;
