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
        res.status(500).send("Failed to add user :"+error);
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
        res.status(400).send("Update Failed:"+err.message)
    }
}
module.exports={createUser,getUser,feed,deleteUser,updateInfo};