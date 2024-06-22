import express from "express";
import { getHotelById, getHotels, searchHotel } from "../controllers/hotels";
import { param } from "express-validator";
const router = express.Router();

router.get("/search", searchHotel);
router.get("/", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotelById
);

export default router;
