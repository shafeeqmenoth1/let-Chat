import Users from "../models/Users.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt  from "jsonwebtoken"



export const profile = async(req,res,next)=>{

    try {
        const token = req.cookies?.access_token;

        if(token){
            jwt.verify(token,process.env.JWT,{sameSite:'none',secure:true},(err,userData)=>{
                if(err) throw err
    
                res.json(userData)
            })
        }else{
            res.status(401).json("No token")
        }
      
    } catch (error) {
        next(error)
    }
}


export const register = async(req,res,next)=>{
    try {
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
           ...req.body,
            password:hash
        })

      await newUser.save()
        res.status(201).json("New User has been Created")
    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    try {
     console.log(req.body);
        const user = await Users.findOne({username:req.body.username})
        if(!user) return next(createError(404,"Username not found")) 
            const isMatch = bcrypt.compareSync(req.body.password, user.password); 

            if(!isMatch) return next(createError(400,"username or password is not correct!"))
            const token = jwt.sign({id:user._id,username:user.username,isAdmin:user.isAdmin}, process.env.JWT)
            const {password,isAdmin,...otherDetails} = user._doc
            res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin})
    } catch (error) {
        next(error)
    }
}

export const logout = async(req,res,next)=>{
    console.log("logout");
    try {
      
        res.clearCookie('access_token',{path:'/'});
    } catch (error) {
        next(error)
    }
}