import cloudinary from "../config/cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
const storage = CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'DESI_Cart',
        formate: "webp",
        transformation:[{
            width: 800 , height : 800 , crop : "limit"
        },
        {
            quality:"auto"
        }
    ]
    }
})
export const upload = multer({storage})