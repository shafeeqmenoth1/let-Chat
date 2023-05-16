import express from "express"
import { updateUser,deleteUser,getUser,getAllUser } from "../controllers/user.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

//UPDATE
router.put("/:id",verifyUser,updateUser)
//DELETE
router.delete("/:id",verifyUser,deleteUser)
//GET
router.get("/find/:id",verifyUser,getUser)
//GET ALL
router.get("/",verifyAdmin,getAllUser)


export default router