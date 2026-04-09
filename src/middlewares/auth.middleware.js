const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth=async(req,res,next)=>{
   try{
     //read the token from the req cookies
    const {token}=req.cookies;
    const decodedMessage =await jwt.verify(token,"DevMingle@123");//validate the token
    if(!token){
        throw new Error("Token is not valid !!!!");
    }
    ///finding the user
    const {_id}=decodedMessage;
    const user=await User.findById(_id);

    if(!user){
        throw new Error("User not found !");
    }
    req.user=user;

    next();
   }catch(error){
    res.status(400).send("Error:"+error.message);
   }
}
module.exports=userAuth;