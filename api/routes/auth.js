import express from "express"
import { login, logout, profile, register } from "../controllers/auth.js"
import fileUpload from "../utils/fileUpload.js"



const router = express.Router()



router.get("/profile",profile)
router.post("/register",fileUpload.single("image"),register)
router.post("/login",login)



export default router