import { Request, Response } from "express";
import processAndUploadImage from "../../utils/imageUtil.js";
import User from "../../models/User.js";
import deleteImagesFromImageKit from "../../helper/deleteImages/index.js";

export const UpdateCoverPhoto=async (req:Request,res:Response)=>{
    const {id}=req.params;
    const {imageId}=req.body;
   

    try{
        const {buffer,originalname} : any =req.file ;
        const uploadResult = await processAndUploadImage(buffer, originalname);
        
        const user=User.findByIdAndUpdate(
            id,{
                     coverPhoto:uploadResult
            },
            {new:true}
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          if(imageId){
            await deleteImagesFromImageKit(imageId);
          }
        res.status(200).json({message:"Cover photo updated successfully"})
    }catch(error:any){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}