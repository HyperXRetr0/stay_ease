import express from "express";
import {
  createBooking,
  createPaymentIntent,
  getHotelById,
  getHotels,
  searchHotel,
} from "../controllers/hotels";
import { param } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const router = express.Router();

router.get("/search", searchHotel);
router.get("/", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotelById
);
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);
router.post("/:hotelId/bookings", verifyToken, createBooking);

export default router;
