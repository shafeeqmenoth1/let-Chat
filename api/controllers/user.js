import Users from "../models/Users.js"





export const updateUser = async(req,res,next)=>{
    console.log(req.body);
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }

}

export const deleteUser = async(req,res,next)=>{
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        next(error)
    }

}

export const getUser = async(req,res,next)=>{
    
    try {
        const user = await Users.findById(req.params.id)
        const {password,isAdmin,...other} = user._doc
        res.status(200).json({...other})
    } catch (error) {
        next(error)
    }

}

export const getAllUser = async(req,res,next)=>{
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }

}