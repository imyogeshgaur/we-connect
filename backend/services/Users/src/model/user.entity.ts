import mongoose, { Schema } from "mongoose";

const userSchema:Schema  = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    location:String,
    company:String,
    position:String,
    Post:{
        type:Array,
        default:null
    }
})

const User = mongoose.model("User",userSchema);
export default User ;
