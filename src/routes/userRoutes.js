const express=require('express');
const router=express.Router();
const userController=require("../controllers/userControllers")
//routes
router.post("/signup",userController.createUser);
router.get("/profile",userController.getUser);
router.get("/feed",userController.feed);
router.delete("/delete-user",userController.deleteUser);




module.exports=router;
