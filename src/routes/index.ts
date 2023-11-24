import express from 'express';
import multer from 'multer';
import addCars from '../Controllers/Cars/addCars.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.send("api working succesful!")
  });
  
  router.route('/properties').post(upload.array('images[]', 10),addCars);









export default router;
