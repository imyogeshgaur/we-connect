import { model, Schema } from "mongoose";

const requestSchema =  new Schema({
    senderId:String,
    reciverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const friendRequest = model("friendRequest",requestSchema)
export default friendRequest;