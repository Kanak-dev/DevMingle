const User=require("../models/user");
const {validateSignupData}=require("../utils/validation");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const { get } = require("mongoose");
 

const createUser=async(req,res)=>{ 
    try{
        //validation of data
        validateSignupData(req);

        //Encrypting password
        const {password}=req.body;
        const saltRound=10;
        const hashpassword=await bcrypt.hash(password,saltRound);
        
        //creating new instance of user model 
            const user=new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: hashpassword
            });
        await user.save();
        res.status(201).send("User Added successfully");
    }catch(error){
        console.error("not Added",error);
        res.status(500).send("Failed to add user :"+error);
    }

}

const checkUser=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials !!!");
        }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            //creating a JWT token
            const token=await user.getJWT();
            //Add the token to cookie and send the response back to the user
            console.log(token);
            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            });
            
            res.status(200).send("Login Successfull");
        }
        if(!isPasswordValid){
            throw new Error("Invalid Credentials !!!!!!");
        }
    
    }catch(error){
        console.error("Login Failed",error);
        res.status(400).send("Login Failed :"+error.message);
    }
}

const getProfile=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("Please Login again");
        }
        
        res.send("Reading cookiessss...."+"   The user is:"+user);
    }catch(error){
        res.status(400).send("Error:"+error.message);
    }
}

const connectionReq=async(req,res)=>{
    const user=req.user;
    console.log("Sending the request.....");
    res.send(user.firstName+"  Connection request has been sent...")
}
const getUserByEmail=async(req,res)=>{
    const userEmail=req.body.emailId;

    try{
        const user=await User.find({emailId:userEmail});
        if(user.length===0){
            res.status(404).send("User not Found");
        }else{
        res.status(200).send(user);
        }
    }catch(error){
        res.status(400).send("Something went Wrong",error);
    }
}

const feed=async(req,res)=>{

    try{
        const user=await User.find({});
        if(user.length===0){
            res.status(404).send("No Users");
        }else{
        res.status(200).send(user);
        }
    }catch(error){
        res.status(400).send("Something went Wrong",error);
    }
}

const deleteUser=async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        res.status(204).send("User deleted successfully");
    }catch(error){
        res.status(400).send("Something went wrong")
    }
}
const updateInfo=async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

    try{
        const ALLOWED_UPDATES=[
        "userId","photoUrl","about","gender","age"
        ];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length>20){
            throw Error("Skills cannot be more than 20...")
        }

        const user=await User.findByIdAndUpdate({_id:userId},data,{runValidators:true,});
        res.status(200).send("Information updated successfully");
    }catch(error){
        console.log(error);
        res.status(400).send("Update Failed:"+error.message)
    }
}
module.exports={createUser,getUserByEmail,connectionReq,feed,deleteUser,updateInfo,checkUser,getProfile};