import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
// Rest of your code...


config();
const app=express();
const port :number=Number(process.env.Port)||8080
app.get('/',(req:Request,res:Response,next:NextFunction)=> {
    res.send('car hub api');
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
