import { Request, Response } from "express";
import Car from "../../models/Car.js";

export const GetSingleCar = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
  
    const car = await Car.findOne({ _id: id });

    if (!car) {
      return res.status(404).send("car not found");
    } else {
      console.log("Car", car);
      res.status(200).send(car);
    }
  } catch (error:any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};