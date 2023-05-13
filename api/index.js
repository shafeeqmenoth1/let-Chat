const express = require("express")
const mongoose = require("mongoose")
const app = express()
const jwt = require('jsonwebtoken')
const  User  = require("./models/User")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
require('dotenv').config()
const ws = require("ws")
const Message = require("./models/Message")
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const getUserdataFromReq = (req)=>{
    return new Promise((resolve,reject)=>{
        const token = req.cookies?.token;

        if(token){
            jwt.verify(token,process.env.JWT_SECRET,{sameSite:'none',secure:true},(err,userData)=>{
                if(err) throw err
    
                resolve(userData)
            })
        }else{
            reject("No token")
        }
    })
}
 
app.get('/',(req,res)=>{
    res.json("Ok")
})

app.get('/messages/:userId',async(req,res)=>{
    
    const {userId} = req.params
  const userData = await getUserdataFromReq(req)
    const ourUserId = userData.userId
    const messages = await Message.find({sender:{$in:[ourUserId,userId]},
        recipient:{$in:[ourUserId,userId]}    }).sort({createdAt:1})
       res.json(messages)
})
app.get("/profile",(req,res)=>{
    try {
        const token = req.cookies?.token;

        if(token){
            jwt.verify(token,process.env.JWT_SECRET,{sameSite:'none',secure:true},(err,userData)=>{
                if(err) throw err
    
                res.json(userData)
            })
        }else{
            res.status(401).json("No token")
        }
      
    } catch (error) {
        if(error) throw error
        res.status(500).json("Some Error Occured")
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(user){
       const passOk =  bcrypt.compare(password,user.password)
       if(passOk){
        jwt.sign({userId:user._id,username},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err
            res.cookie('token',token).status(200).json({id:user._id})
        })
       }
    }
})

app.post('/register',async(req,res)=>{
    try {
        const {username,password} = req.body

        console.log(req.body);
    const hashedPassword = bcrypt.hashSync(password,10)
    const newuser = await User.create({username,password:hashedPassword})

    jwt.sign({userId:newuser._id,username},process.env.JWT_SECRET,{},(err,token)=>{
        if(err) throw err
        res.cookie('token',token).status(201).json({id:newuser._id})
    })
    } catch (err) {
        if(err) throw err
        res.status(500).json("Some Error Occured")
    }
})
const server = app.listen(4000)

const wss = new ws.WebSocketServer({server})

wss.on("connection",(connection,req)=>{
    console.log("connected");
    const cookies = req.headers.cookie
    if(cookies){
     const tokenCookieString = cookies.split(',').find(str=>str.startsWith("token="))
     if(tokenCookieString){
        const token = tokenCookieString.split('=')[1]
        if(token){
            if(token){
                jwt.verify(token,process.env.JWT_SECRET,{sameSite:'none',secure:true},(err,userData)=>{
                    if(err) throw err
                   const {username,userId} = userData
                   connection.userId = userId
                   connection.username = username
                })
            }
        }
     }

  
        connection.on("message",async(message)=>{
          const  messageData = JSON.parse(message.toString())
            const {recipient,text} = messageData
          const messageDoc = await Message.create({
                sender:connection.userId,
                recipient,
                text
            })
            if(recipient && text){
                [...wss.clients].filter(c=>c.userId === recipient).forEach(c=>c.send(JSON.stringify({text,sender:connection.userId,recipient,
                _id:messageDoc._id})))
            }
        })
    
    }

    [...wss.clients].forEach(client=>client.send(JSON.stringify({
        online:[...wss.clients].map(c=>({userId:c.userId,username:c.username}))
       })));
})