import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"

// Api Middlewares

app.use(cookieParser())
app.use(express.json())

// MongoDb Database
const connect = async ()=>{
    try {
         mongoose.connect(process.env.MONGO)
        
        console.log("connected to MongoDB");
    } catch (error) {
        throw error
    }
}
mongoose.set('strictQuery', true)


app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)

//error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack
    })
})




app.listen(5000,()=>{
    connect()
    console.log("connected to Backend!");
})