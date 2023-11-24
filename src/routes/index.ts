import express, { Request, Response } from "express";
import multer from "multer";
import addCars from "../Controllers/Cars/addCars.js";
import { loginUser } from "../Controllers/Auth/Login.js";
import { registerUser } from "../Controllers/Auth/Signup.js";
import { getAllUsers } from "../Controllers/Users/getAllUsers.js";
import getSingleUser from "../Controllers/Users/getSingleUser.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/api", (req:Request, res:Response) => {
  res.send("api working succesful!");
});
router.post("/api/auth/signup", registerUser);
router.post("/api/auth/login", loginUser);
router.route('/api/users/').get(getAllUsers);
router.route('/api/users/:id').get(getSingleUser)
router.route("/api/properties").post(upload.array("images[]", 10), addCars);

export default router;
