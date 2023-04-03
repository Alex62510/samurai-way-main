import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


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

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name='Dimich' id="1"/>
                <DialogItem name='Andrey' id="2"/>
                <DialogItem name='Sveta' id="3"/>
                <DialogItem name='Sasha' id="4"/>
                <DialogItem name='Victor' id="5"/>
                <DialogItem name='Valera' id="6"/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'How are you'}/>
                <Message message={'Yo'}/>
            </div>
        </div>
    );
};

export default Dialogs;