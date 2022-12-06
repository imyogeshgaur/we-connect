import { model, Schema } from "mongoose";

const friendSchema =  new Schema({
    requesterId: {
        type:Schema.Types.ObjectId,
        ref:"Auth"
    },
    approverId:{
        type:Schema.Types.ObjectId,
        ref:"Auth"
    }
})

const Friend = model("Friend",friendSchema)
export default Friend;