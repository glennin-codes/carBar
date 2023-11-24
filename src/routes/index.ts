import express from 'express';
import multer from 'multer';
import addCars from '../Controllers/Cars/addCars.js';
import { loginUser } from '../Controllers/Auth/Login.js';
import { registerUser } from '../Controllers/Auth/Signup.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.send("api working succesful!")
  });
  router.post('/auth/signup',registerUser)
router.post('/auth/login',loginUser);
  router.route('/properties').post(upload.array('images[]', 10),addCars);









export default router;
