import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const dialogs = [
    {id: 1, name: 'Dimich'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Victor'},
    {id: 6, name: 'Valera'}
]
const messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
]
const DialogItem = (props: any) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}
const Message = (props: any) => {
    return (
        <div className={s.dialog}> {props.message}</div>
    )
}

const dialogElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
const messageElements = messages.map(mes => <Message message={mes.message}/>)

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    );
};

export default Dialogs;