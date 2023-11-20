import React, {FC, useEffect, useState, } from 'react';
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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}
const Messages: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const parse = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...parse])
        }

        wsChannel?.addEventListener("message", messageHandler)
        return () => {
            wsChannel?.removeEventListener("message", messageHandler)
        }
    }, [wsChannel]);

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
const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [isReady, setIsReady] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setIsReady('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener("open", openHandler)
        }
    }, [wsChannel]);

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
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
                <Button disabled={wsChannel == null || isReady !== 'ready'} onClick={sendMessage}>Send</Button>
            </div>
        </div>


    )
}
export default ChatPage;