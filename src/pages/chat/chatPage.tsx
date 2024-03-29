import React, {FC, useEffect, useRef, useState,} from 'react';
import style from "./chatPage.module.css"
import {Button, Image} from "antd";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
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
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch]);


    return (
        <div>
            {status === "error" && <div>Error please refresh page </div>}
            <>
                <Messages/>
                <AddMessageForm/>
            </>

        </div>
    )
}
const Messages: FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    }, [messages,isAutoScroll]);

    return (
        <div className={style.messages} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
const Message:FC<{ message: ChatMessageType }> =  React.memo(({message}) => {

    return (
        <div>
            <Image src={message.photo} className={style.avatar} preview={false}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})
const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')

    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
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
                <Button disabled={status !== "ready"} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>


    )
}
export default ChatPage;