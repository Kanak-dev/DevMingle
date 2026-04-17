const express=require("express");
const connectionRouter= express.Router();
const userAuth=require("../middlewares/auth.middleware");
const requestController=require("../controllers/requestControllers");

connectionRouter.post("/request/send/:status/:toUserId",userAuth,requestController.requestStatus);
connectionRouter.post("/request/review/:status/:requestId",userAuth,requestController.reviewStatus);

module.exports=connectionRouter;