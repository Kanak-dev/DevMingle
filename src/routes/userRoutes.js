const express=require('express');
const router=express.Router();
const userController=require("../controllers/userControllers");
const userAuth=require("../middlewares/auth.middleware");
//routes
router.post("/signup",userController.createUser);
router.post("/login",userController.checkUser);
router.get("/profile",userAuth,userController.getProfile);
router.post("/connection",userAuth,userController.connectionReq);

router.get("/feed",userController.feed);
router.delete("/delete-user",userController.deleteUser);
router.patch("/user/:userId",userController.updateInfo);





module.exports=router;
