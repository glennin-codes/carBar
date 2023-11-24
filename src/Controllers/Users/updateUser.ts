import { Request, Response } from "express";
import User from "../../models/User.js";
import bcrypt from 'bcrypt';
// Update user by ID with PATCH method
const UpdateUser = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { firstName, lastName ,email, phoneNumber, location,isVerified,verificationCode ,password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
if(password){
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password=hashedPassword;
}
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (location) user.location = location;
    if (isVerified) user.isVerified =isVerified;
    if (verificationCode) user.verificationCode = verificationCode;
    // if (longitude) user.longitude = longitude;
    // if (latitude) user.latitude = latitude;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default UpdateUser;