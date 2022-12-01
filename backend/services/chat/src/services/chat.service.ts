import Chat from "../models/chat.entity";

export default class ChatService {
    async getAllChatAllRoom() {
        try {
            const chats = await Chat.find();
            return chats;
        } catch (error) {
            console.log(error)
        }
    }
    async getAllChatOfRoom(roomId: string) {
        try {
            const chats = await Chat.find({ roomId })
            return chats;
        } catch (error) {
            console.log(error)
        }
    }
    async getChatsOfAUser(recieverId: string) {
        try {
            const chats = await Chat.find({ recieverId })
            return chats;
        } catch (error) {
            console.log(error)
        }
    }
    async saveChats(body: any) {
        try {
            const { roomId, recieverId, senderId, message } = body;
            const chatToSave = await Chat.create({ roomId, recieverId, senderId, message })
            const result = await chatToSave.save()
            return result
        } catch (error) {
            console.log(error)
        }
    }
}