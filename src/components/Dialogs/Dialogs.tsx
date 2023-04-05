import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/state";


export type DialogsPropsType = {
    dialogs: DialogsType
    messages: MessagesType
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsElement = props.dialogs.map(d => < DialogItem name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map(m => <Message messageElement={m.message}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    );
};

export default Dialogs;