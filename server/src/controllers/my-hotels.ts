import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types";
import Hotel from "../models/hotel";

export const create = async (req: Request, res: Response) => {
  try {
    // upload the image to cloudinary

    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    return res.status(201).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.log("Error creating hotel: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    return res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching hotels",
    });
  }
};
