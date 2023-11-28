

import { Request, Response } from "express";
import Car from "../../models/Car.js";
import User from "../../models/User.js";
import deleteImagesFromImageKit from "../../helper/deleteImages/index.js";

// Delete user by ID
const deleteUser = async (req:Request, res:Response) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const deletedUser = await User.findOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

     // Find Car associated with the user's email
     const cars = await Car.find({ User: deletedUser.email });

     // If user has Car, proceed to delete images and Car
     if (cars && cars.length > 0) {
       for (const car of cars) {
         if (car.images && car.images.length > 0) {
           const imageIds = car.images
             .filter(image => image && image.id) // Filter out null or empty images
             .map(image => image.id);
           if (imageIds.length > 0) {
             await deleteImagesFromImageKit(imageIds);
           }
         }
         await Car.deleteOne({ _id: car._id });
       }
     }
 
     // Delete the user from the database
     await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default deleteUser;