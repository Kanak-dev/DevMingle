const express=require('express');
const router=express.Router();
const userController=require("../controllers/userControllers")
//routes
router.post("/signup",userController.createUser);

module.exports=router;
