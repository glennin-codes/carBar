
import mongoose, { Document, Schema } from "mongoose";



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
    verificationCode:number;
    signupMethod:string;
}


const userSchema = new Schema <Iuser>({
    email:{type:String,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,},
    phoneNumber:{type:String,},
    location:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    isVerified:{type:Boolean,default:false},
    verificationCode:{type:Number,default:0},
    signupMethod:{
        type:String,
        enum:["manual","google"]   
    }

    
});
 const User = mongoose.model<Iuser>("Users",userSchema);
 export default User;