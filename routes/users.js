const express=require("express");
const router=express.Router()
const {getUserController,updateUserController}=require("../controllers/userController")

// GET USER
router.get("/:userId",getUserController)

// UPDATE USER 
router.put("/update/:userId",updateUserController)


module.exports=router;
