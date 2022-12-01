import { Schema, model } from "mongoose";

const chatSchema: Schema = new Schema({
    roomId: String,
    senderId: String,
    recieverId: String,
    message: String
})

const Chat = model("Chat", chatSchema);
export default Chat;