import React, {FC} from 'react';
import style from "./chatPage.module.css"

const ws=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};
const Chat: FC = () => {


    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages: FC = () => {
    const messages: any[] = [1,2,3,4,5,6,7]
    return (
        <div className={style.messages}>
            {messages.map((m) => <Message/>)}
        </div>
    )
}
const Message: FC = () => {
    const message = {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxjy_n63skpStAoGo8O83ma5kzGCr1aI_QMKBmy6REnwAdBYK4EdfeetZYOPGuvn0Z-s&usqp=CAU",
        author:"Alex",
        text: "Hi"
    }
    return (
        <div>
            <img src={message.url} className={style.avatar}/>
            <b>{message.author}</b>
            <br/>
            {message.text}
            <hr/>
        </div>
    )
}
const AddMessageForm: FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>


    )
}
export default ChatPage;