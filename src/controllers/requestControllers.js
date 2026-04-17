const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

const requestStatus=async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"Invalid status type:"+status
            });
        }

        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({
                message:"User not found !!!"
            })
        }

        const existingConnectionRequest =await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(existingConnectionRequest){
             return res.status(400).send({message:"Connection Request Already Exists !!"});
        }
        const connectionRequest= new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data=await connectionRequest.save();
        res.status(200).json({
            message:req.user.firstName+" is "+status+" in "+toUser.firstName,
            data,
        })
        console.log("YEYYYYYYY🤩")
    }catch(error){
        res.status(400).send("Error: "+error.message);
        throw new Error;
    }
}

const reviewStatus=async(req,res)=>{
    try{
        const loggedinUser=req.user;
        const {status,requestId}=req.params;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({
                message:"Invalid status type: "+status
            });
        }
        const connectionRequest=await ConnectionRequest.findById({
            _id:requestId,                
            toUserId:loggedinUser._id,        ////<-----jisko request gayi h
            status:"interested"
        });

        if(!connectionRequest){
            return res.send("There is no connection requests!");
        }
        connectionRequest.status=status;

        const data=await connectionRequest.save();

        res.status(200).json({
            messsage:"Request has been "+status,
            data
        })
        

    }catch(error){
        res.status(400).send("Error: "+error.message);
    }
}

module.exports={requestStatus,reviewStatus};

