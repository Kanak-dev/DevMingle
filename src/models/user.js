const mongoose=require('mongoose');
const validator=require('validator');
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName: {
        type:String
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:"+value);
            }
        }
    },
    password:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password:"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type: String,
        validate(value){
            if(["male","female","others"].includes(value)){
                throw new Error("Gender is not defined")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOarq1jUvWGr6A-mkiBrh9pbU6U1gcf0kDJA&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url:"+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default of a person"
    },
    skills:{
        type:[String]
    }

},{
    timestamps:true
});

userSchema.methods.getJWT=async function(){
    const user=this;        // this keyword doesnt work with arrow function

    const token=await jwt.sign({_id:user._id},"DevMingle@123",{expiresIn:'7d'});

    return token;
}
userSchema.methods.validatePassword=async function (password) {
    const user=this;
    const passwordHash=user.password;
    const isPasswordvalid=await bcrypt.compare(password,passwordHash);

    return isPasswordvalid;
    
}


const User= mongoose.model("User",userSchema);
module.exports=User;