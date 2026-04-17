const User=require("../models/user");
const {validateSignupData, validateEditProfileData}=require("../utils/validation");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const { get, isValidObjectId } = require("mongoose");
 

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

const updateProfile=async(req,res)=>{
    try{
        if(!validateEditProfileData){
            throw new Error("Invalid Update request");
        }
        const loggedinUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedinUser[key]=req.body[key]));

        await loggedinUser.save();

        res.json({
            message:`${loggedinUser.firstName},your profile is updated successfully`,
            data: loggedinUser
        })

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
module.exports={getProfile,updateProfile,getUserByEmail,connectionReq,feed,deleteUser};