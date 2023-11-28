import { Request, Response } from "express";
import Car from "../../models/Car.js";
import deleteImagesFromImageKit from "../../helper/deleteImages/index.js";

export const deleteCar = async (req:Request, res:Response) => {
    const { id } = req.params;
  
    try {
      // Retrieve the car from MongoDB
      const car = await Car.findById(id);
      if (!car) {
        return res.status(404).send("car not found");
      }
  
    // Retrieve the fileIds of images associated with the car
    const fileIdsToDelete : any = (car.images|| [])
      .filter(image => image.id) // Filter out images with no id
      .map(image => image.id);   
      // Delete images from ImageKit.io
      await deleteImagesFromImageKit(fileIdsToDelete);
  
      await Car.deleteOne({ _id: id });
  
      res.status(200).send("car deleted succesfuly");
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  };
  
  


  