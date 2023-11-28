import express, { Request, Response } from "express";
import multer from "multer";
import addCars from "../Controllers/Cars/AddCars.js";
import { loginUser } from "../Controllers/Auth/Login.js";
import { registerUser } from "../Controllers/Auth/Signup.js";
import { getAllUsers } from "../Controllers/Users/getAllUsers.js";
import getSingleUser from "../Controllers/Users/getSingleUser.js";
import UpdateUser from "../Controllers/Users/updateUser.js";
import AuthenticateToken from "../middlwares/AuthMiddleware.js";
import deleteUser from "../Controllers/Users/deleteUser.js";
import { GetAllCars } from "../Controllers/Cars/GetAllCars.js";
import { GetSingleCar } from "../Controllers/Cars/GetSingleCar.js";
import { UpdateCar } from "../Controllers/Cars/UpdateCar.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/api", (req:Request, res:Response) => {
  res.send("api working succesful!");
});
router.post("/api/auth/signup", registerUser);
router.post("/api/auth/login", loginUser);
router.route('/api/users/').get(getAllUsers);
router.route('/api/users/:id').get(getSingleUser).patch(AuthenticateToken,upload.single('photo'),UpdateUser).delete(AuthenticateToken,deleteUser)
router.route("/api/cars").post(upload.array("images[]", 10), addCars).get(GetAllCars);
router.route("/api/cars/:id").get(GetSingleCar).patch(UpdateCar);

export default router;
