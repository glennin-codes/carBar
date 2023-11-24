
import Car from "../../models/Car.js";
import { clearMemory } from "../../utils/ClearMemory.js";
import { Request, Response } from "express";
import processAndUploadImage from "../../utils/imageUtil.js";
i

const addCars = async (req: Request, res:Response) => {
try {
  
  console.log("files", req.files);
  // Process and store images using ImageKit
  const imagePromises = Array.isArray(req.files)
    ? req.files.map(async (image: { buffer: any; originalname: any }) => {
        const { buffer, originalname } =image;
        console.log('buffer', buffer);
        return await processAndUploadImage(buffer, originalname);
      })
    : [];
    
  console.log('length', imagePromises)

  const processedImages = await Promise.all(imagePromises);
  console.log("imagesUrl processed ", processedImages);

  
  
    

    
    // Prepare property data
    const CarData = {
        modelName: req.body.modelName,
        yearOfManufacture: req.body.yearOfManufacture,
        mileage: req.body.mileage,
        color: req.body.color,
        location:req.body.location,
        images: processedImages,
        engineSize: req.body.engineSize,
        transmissionType: req.body.transmissionType,
        fuelType: req.body.fuelType,
        usedOrigin: req.body.usedOrigin,
        description: req.body.description,
        owner:req.body.id,
        price: req.body.price,
        
        
    };

    // Create new property listing
    const newCar = new Car(CarData);
    await newCar.save();

    res.status(200).json({ message: "Property added successfully!" ,car:newCar});
    clearMemory(req, res);
  } catch (error) {
    console.error("error",error);
    res.status(500).json({ error: "Failed to add property." });
  }
};

export default addCars;

