import { Schema,model } from "mongoose";



const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    image:String,
    address:{
        type:String,
        required:true
    },
  
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true})


export default model("User",userSchema)