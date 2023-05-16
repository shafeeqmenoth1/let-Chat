import multer from "multer"
import { v4 } from "uuid"

import path from"path"

multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"../public/upload")
    },
    filename:function(req,file,cb){
        cb(null,`${v4}_${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedfileTypes = ["image/jpeg","image/jpg","image/png"]
    if(allowedfileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const fileUpload = multer({storage,fileFilter})

export default fileUpload




