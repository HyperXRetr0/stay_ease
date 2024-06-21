import express from "express";
import { getHotels, searchHotel } from "../controllers/hotels";
const router = express.Router();

router.get("/search", searchHotel);
router.get("/", getHotels);

export default router;
