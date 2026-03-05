const User=require("../models/user");

const createUser=async(req,res)=>{
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

module.exports={createUser};