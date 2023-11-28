import mongoose, { Document, Schema, Types } from "mongoose";
interface IImage {
  id: string;
  url: string;
  title: string;
  thumbnailUrl: string;
}

interface ICar extends Document {
    modelName: string;
    yearOfManufacture: number;
    mileage: number;
    color: string;
    location: string;
    images:IImage[];
    engineSize: string;
    transmissionType: string;
    fuelType: string;
    usedOrigin: string;
    description: string;
    owner:Types.ObjectId;
    createdAt: Date;
    verified:boolean;
    price:string;
}
  

// Car schema
const carSchema = new Schema<ICar>({
    modelName: { type: String, required: true },
    yearOfManufacture: { type: Number, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: [
      {
        id: String,
        url: String,
        title: String,
        thumbnailUrl:String
      }]
      , default: [] },
      price:{type:String},
    engineSize: { type: String, required: true },
    transmissionType: { type: String, required: true },
    fuelType: { type: String, required: true },
    usedOrigin: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    verified:{type:Boolean,default:false},
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
    
  });
const Car = mongoose.model<ICar>(
    "Car",
    carSchema
);

export default Car;


