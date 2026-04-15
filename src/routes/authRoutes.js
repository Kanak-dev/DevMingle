const express=require("express");
const authRouter=express.Router();
const authController=require("../controllers/authControllers");


authRouter.post("/signup",authController.createUser);
authRouter.post("/login",authController.checkUser);
authRouter.post("/logout",authController.logoutUser);

module.exports=authRouter;