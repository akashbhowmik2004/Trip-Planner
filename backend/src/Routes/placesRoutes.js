import {Router} from "express";
import { getFamousPlaces,getPlacesImages,getDestinationImages } from "../controllers/famousPlacesController.js";

const router = Router();

router.post("/get-famous-places", getFamousPlaces);
router.post("/get-places-images", getPlacesImages);
router.post("/get-destination-images", getDestinationImages);

export default router;