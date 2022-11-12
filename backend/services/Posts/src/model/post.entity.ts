import mongoose, { Schema } from "mongoose";

const postSchema:Schema  = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:String,
    hashtag:String,
    created_by:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        required:true
    }
})

const Post = mongoose.model("Post",postSchema);
export default Post;
