const express=require('express');
const profileRouter=express.Router();
const userController=require("../controllers/userControllers");
const userAuth=require("../middlewares/auth.middleware");
//routes

profileRouter.get("/profile/view",userAuth,userController.getProfile);
profileRouter.patch("/profile/edit",userAuth,userController.updateProfile);

module.exports=profileRouter;