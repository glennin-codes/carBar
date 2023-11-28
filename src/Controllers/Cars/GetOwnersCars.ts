import { Request, Response } from "express";
import Car from "../../models/Car.js";

export const OwnersCars=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try {
        const cars = await Car.find({ owner: id}).populate("owner");
        if(!cars){
            res.status(404).json({message:"cars not found"});
        }
        res.status(200).json(cars)

    } catch (error:any) {
        console.error(error);
        res.status(500).json({
            message:error.message
        })
        
    }
}