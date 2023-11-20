import React, {FC, useEffect, useState,} from 'react';
import style from "./chatPage.module.css"
import {Button, Image} from "antd";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {useSelector} from "react-redux";

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

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    }, []);


    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}
const Messages: FC = () => {

   const messages=useSelector((state:AppStateType) =>state.chat.messages )

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
const AddMessageForm: FC = () => {
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