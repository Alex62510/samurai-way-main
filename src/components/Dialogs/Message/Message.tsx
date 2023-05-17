import React from 'react';
import s from './../Dialogs.module.css'


export type MessagePropsType ={
    messageElement:string
}


const Message = (props: MessagePropsType) => {
    return (
        <div className={s.dialog}> {props.messageElement}</div>
    )
}

export default Message;