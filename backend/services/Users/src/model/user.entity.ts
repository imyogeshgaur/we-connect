import mongoose, { Schema } from "mongoose";

const userSchema:Schema  = new mongoose.Schema({
    name:String,
    phone:String,
    location:String,
    company:String,
    position:String,
    image:String,
    authId:{
        type:Schema.Types.ObjectId,
        ref:"Auth",
    }
})

const User = mongoose.model("User",userSchema);
export default User ;
