import ImageKit from 'imagekit';
import { config } from "dotenv";
config();
interface IImagekitconfig{
    publicKey:string;
    privateKey:string;
    urlEndpoint:string;
}
const imagekitconfig:IImagekitconfig={
        publicKey: process.env.publicKey || '',
    privateKey: process.env.privateKey || '',
    urlEndpoint:"https://ik.imagekit.io/hcmhqwy2h" || ''

}

export  const imagekit=new ImageKit(imagekitconfig);