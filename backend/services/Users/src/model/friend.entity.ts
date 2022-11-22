import { model, Schema } from "mongoose";

const friendSchema =  new Schema({
    requesterId: String,
    approverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const friend = model("friend",friendSchema)
export default friend;