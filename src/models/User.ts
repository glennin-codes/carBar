
import mongoose, { Document, Schema } from "mongoose";

interface IImage {
    id: string;
    url: string;
    title: string;
    thumbnailUrl: string;
}  

interface Iuser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    location:string;
    createdAt: {
        type: Date;
        default: Date;
    };
    isVerified:boolean;
    verificationCode:string;
    signupMethod:string;
    coverPhoto: IImage;
    profilePhoto:IImage;
}

const userSchema = new Schema <Iuser>({
    email:{type:String,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,},
    phoneNumber:{type:String,},
    location:{type:String,},
    coverPhoto: { type:  {
        id: String,
        url: String,
        title: String,
        thumbnailUrl:String
    }},
    profilePhoto:{ type:  {
        id: String,
        url: String,
        title: String,
        thumbnailUrl:String
       }},

    createdAt:{type:Date,default:Date.now},
    isVerified:{type:Boolean,default:false},
    verificationCode:{type:String},
    signupMethod:{
        type:String,
        enum:["manual","google"]   
    }

    
});
 const User = mongoose.model<Iuser>("Users",userSchema);
 export default User;