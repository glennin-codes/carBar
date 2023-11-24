import ImageKit from 'imagekit';
import { config } from "dotenv";
config();
interface IImagekitconfig{
    publicKey:string;
    privateKey:string;
    urlEndpoint:string;
}
const imagekitconfig:IImagekitconfig={
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint:process.env.IMAGEKIT_URL || ''

}

export  const imagekit= new ImageKit(imagekitconfig);