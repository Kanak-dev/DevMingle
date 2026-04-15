const User=require("../models/user");
const {validateSignupData}=require("../utils/validation");
const bcrypt=require("bcrypt");

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

const logoutUser=async(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        samesite:"strict",
        secure:true,
        expires: new Date(Date.now()),

    });
    res.send("Logout Successfully !!!");
}

module.exports={createUser,checkUser,logoutUser};