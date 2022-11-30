import express from 'express'
const app = express()
import http from "http"
const server = http.createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}})

server.listen(8000)
io.on('connection' ,(socket:any)=>{
    socket.on('send-message',(payload:any)=>{
        io.emit("send-message",payload)
    })
})
