const express=require('express');
const router=express.Router();
const userController=require("../controllers/userControllers")
//routes
router.post("/signup",userController.createUser);
router.get("/profile",userController.getUser);
router.get("/feed",userController.feed);
router.delete("/delete-user",userController.deleteUser);
router.patch("/user/:userId",userController.updateInfo);
router.post("/login",userController.checkUser);




module.exports=router;
