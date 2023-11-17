import React, {FC, useEffect, useState} from 'react';
import style from "./chatPage.module.css"
import {Button, Image} from "antd";



export type ChatMessageType = {

    userId: number,
    userName: string,
    message: string,
    photo: string
}

const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};
const Chat: FC = () => {
    let ws: WebSocket
    useEffect(() => {

        function createChannel(){
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener('close',()=>{
                console.log("close WS")
            })
        }
        createChannel()

    }, [])

    return (
        <div>
            <Messages ws={ws}/>
            <AddMessageForm ws={ws}/>
        </div>
    )
}
const Messages: FC<{ ws: WebSocket }> = ({ws}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener("message", (e) => {
            const parse = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...parse])
        })
    }, []);

    return (
        <div className={style.messages}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}
const Message: FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <Image src={message.photo} className={style.avatar} preview={false}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}
const AddMessageForm:  FC<{ ws: WebSocket }> = ({ws}) => {
    const [message, setMessage] = useState('')
    const [isReady, setIsReady] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        ws.addEventListener('open', () => {
            setIsReady('ready')
        })
    }, []);

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => {
                    setMessage(e.currentTarget.value)
                }} value={message}></textarea>
            </div>
            <div>
                <Button disabled={isReady !== 'ready'} onClick={sendMessage}>Send</Button>
            </div>
        </div>


    )
}
export default ChatPage;