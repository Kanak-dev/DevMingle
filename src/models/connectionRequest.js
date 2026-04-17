const mongoose=require("mongoose");

const userConnectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,    
        ref:"User",                       //just like the foreign key used for referencing
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"true",
        required:true
    },
    status:{
        type:String,
        enum:{                             //used to fix only these values will used or we can say not other than these values are allowed
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }
},{
    timestamps:true
})

userConnectionRequestSchema.index({fromUserId:1,toUserId:1});   //Creating index for the fast retrieval of the data from the collection.

userConnectionRequestSchema.pre("save",async function(next){
    const connectionRequest=this;
    //checking if the user is not sending the request to self.
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }
    
});

const ConnectionRequestModel=mongoose.model("ConnectionRequest",userConnectionRequestSchema);

module.exports=ConnectionRequestModel;
