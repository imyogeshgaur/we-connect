import mongoose, { Schema } from "mongoose";

const authSchema:Schema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const Auth = mongoose.model("Auth",authSchema);
export default Auth;