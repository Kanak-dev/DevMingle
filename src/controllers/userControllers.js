const User=require("../models/user");

const createUser=async(req,res)=>{
    //creating new instance of user model 
        const user=new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password
        });
    try{
        await user.save();
        res.status(201).send("User Added successfully");
    }catch(error){
        console.error("not Added",error);
        res.status(500).send("Failed to add user");
    }

}

const getUser=async(req,res)=>{
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
module.exports={createUser,getUser,feed,deleteUser};