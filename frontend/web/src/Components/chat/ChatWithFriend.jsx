import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { io } from "socket.io-client"
import NavBar from '../assets/NavBar';

const ChatWithFriend = () => {
    const param = useParams();
    const [message, setMessage] = useState("")
    const [chat, setchat] = useState([])
    const navigate = useNavigate();

    if(param===undefined){
        navigate("/")
    }
    const user = param.name;
    
    const sendMessage = (e) => {
        const socket = io("http://localhost:8000")
        e.preventDefault()
        socket.emit("send-message", { message, user })
        setMessage('')
    }
    useEffect(() => {
        const socket = io("http://localhost:8000")
        socket.on('send-message', (payload) => {
            setchat([...chat, payload])
        })
    })
    return (
        <>
        <NavBar name={`${user}`} showChat="none" />
            <div className="mb-3">
                {
                    chat.map((val, index) => {
                        return <p key={index}>{val.user} : {val.message}</p>
                    })
                }
            </div>
            <form className="row" onSubmit={sendMessage}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Message</label>
                    <div style={{ display: "flex" }}>
                        <input type="text" className="form-control w-100" placeholder="Enter Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="btn btn-primary" type="submit">Send</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChatWithFriend