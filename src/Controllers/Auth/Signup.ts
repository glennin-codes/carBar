
import { Request, Response } from "express";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../../utils/Email/sendVerification.js";
import { Types } from "mongoose";

const generateAuthToken = (userId:Types.ObjectId, email: string,name: string) => {
    return jwt.sign(
      { userId: userId, email: email,name:name },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );
  };

export const registerOwner = async (req:Request, res:Response) => {
  try {
    if (req.body.googleUserData) {
      console.log(req.body.googleUserData);
      // Sign-up with Google
      // const googleSignupID = req.body.googleSignupID;
      // const decodedToken = await admin.auth().verifyIdToken(googleSignupID);
      const {    displayName,
        photoURL,
        email,} = req.body.googleUserData;

      const ownerExist = await User.findOne({ email: email });

      if (ownerExist) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const user = new User({
        name: displayName,
        email: email,
        photo:photoURL?photoURL:"",
        password: null,
        signupMethod: "google",
        isVerified: true,
        verificationCode:null
      });

      await user.save();
const name=`${user.firstName } ${user.lastName}`;
      const token = generateAuthToken(user._id, user.email,name);

      return res
        .status(201)
        .json({ token,id:user._id });
    } else {
      // Manual Sign-up
      const { firstName,lastName, email, password, phone,location} =
        req.body;

      const existingOwner = await User.findOne({ email: email });

      if (existingOwner) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(Math.random() * 900000) + 100000;

      const user = new User({
        name:`${firstName} ${lastName}`,
        email: email,
        password: hashedPassword,
        phone: phone,
        location: location,
        signupMethod: "manual",
       verificationCode:verificationCode,
      });

    await user.save();

    const verify = {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        code: user.verificationCode,
    };

    VerifyEmail(verify.email, verify.name, verify.code);


      return res
        .status(200)
        .json({ message:"verification sent"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};