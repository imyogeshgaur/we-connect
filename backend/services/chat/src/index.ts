import express from 'express'
const app = express()
import http from "http"
import ChatController from './controllers/chat.controller';
import { createConnection } from './database/db.config';
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } })

createConnection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/allChat", async (req, res) => {
    try {
        const chatController = new ChatController();
        await chatController.getAllChatAllRoom(req, res);
    } catch (error) {
        console.log("Chat's Service : Global Error " + error);
    }
})
app.get("/rooms/:roomId", async (req, res) => {
    try {
        const chatController = new ChatController();
        await chatController.getAllChatOfRoom(req, res);
    } catch (error) {
        console.log("Chat's Service : Global Error " + error);
    }
})
app.get("/users/:recieverId", async (req, res) => {
    try {
        const chatController = new ChatController();
        await chatController.getChatsOfAUser(req, res);
    } catch (error) {
        console.log("Chat's Service : Global Error " + error);
    }
})
app.post("/save", async (req, res) => {
    try {
        const chatController = new ChatController();
        await chatController.saveChats(req, res);
    } catch (error) {
        console.log("Chat's Service : Global Error " + error);
    }
})


server.listen(8000, () => console.log("Chat Service is Running !!!"))
io.on('connection', (socket: any) => {
    socket.on('send-message', (payload: any) => {
        io.emit("send-message", payload)
    })
})
