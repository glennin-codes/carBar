import { Request, Response } from "express";
import Car from "../../models/Car.js";
import { Types } from "mongoose";
import processAndUploadImage from "../../utils/imageUtil.js";
import deleteImagesFromImageKit from "../../helper/deleteImages/index.js";

export const UpdateCar = async (req:Request, res:Response) => {
    const { id } = req.params ;

    const photosToUpdate:any = req.files ?? []; // Array of updated photos
    const indexes = req.body.indexes ?? []; // Array of corresponding indexes
    
    try {
      const carToUpdate = await Car.findById(id);
      if (!carToUpdate) {
        return res.status(404).send({ message: "Car not found" });
      }
    
      for (let i = 0; i < photosToUpdate.length; i++) {
        const { buffer, originalname } = photosToUpdate[i];
        const photoIndex = indexes[i];
    
        const uploadResult = await processAndUploadImage(buffer, originalname);
    
        // Delete old photo from ImageKit
        if (carToUpdate.images[photoIndex]?.id) {
          await deleteImagesFromImageKit(carToUpdate.images[photoIndex].id);
        }
    
        carToUpdate.images[photoIndex] = uploadResult;
      }

    // Update other fields
 
        carToUpdate.modelName = req.body.modelName;
        carToUpdate.yearOfManufacture = req.body.yearOfManufacture;
        carToUpdate.mileage = req.body.mileage;
        carToUpdate.color = req.body.color;
        carToUpdate.location = req.body.location;
        carToUpdate.engineSize = req.body.engineSize;
        carToUpdate.transmissionType =  req.body.transmissionType;
        carToUpdate.fuelType = req.body.fuelType;
        carToUpdate.usedOrigin = req.body.usedOrigin;
        carToUpdate.description =req.body.description;   
        carToUpdate.price = req.body.price;
      const updatedCar = await carToUpdate.save();

    res.status(200).send({ message: "car updated successfully", car: updatedCar });
  } catch (error:any) {
    console.error(error.message);
    res.status(500).send({ message: "Server error" });
  }
};