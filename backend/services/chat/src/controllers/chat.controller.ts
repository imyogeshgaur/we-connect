import { Request, Response } from "express";
import ChatService from "../services/chat.service";

export default class ChatController {
    protected chatService = new ChatService();

    async getAllChatAllRoom(req: Request, res: Response) {
        try {
            const chats = await this.chatService.getAllChatAllRoom();
            return res.status(200).send(chats)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async getAllChatOfRoom(req: Request, res: Response) {
        try {
            const roomId = req.params.roomId;
            const chatsOfRoom = await this.chatService.getAllChatOfRoom(roomId);
            return res.status(200).send(chatsOfRoom)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async getChatsOfAUser(req: Request, res: Response) {
        try {
            const recieverId = req.params.recieverId;
            const chatsOfPerson = await this.chatService.getChatsOfAUser(recieverId);
            return res.status(200).send(chatsOfPerson);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
    async saveChats(req: Request, res: Response) {
        try {
            const body = req.body;
            const result = await this.chatService.saveChats(body);
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error !!!")
        }
    }
}