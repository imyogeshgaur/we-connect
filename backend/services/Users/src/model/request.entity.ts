import { model, Schema } from "mongoose";

const requestSchema =  new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"Auth"
    },
    reciverId:{
        type:Schema.Types.ObjectId,
        ref:"Auth"
    }
})

const friendRequest = model("friendRequest",requestSchema)
export default friendRequest;