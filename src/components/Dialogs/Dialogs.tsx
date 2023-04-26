import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/store";
import {sendMessageCreater,updateNewMessageBodyCreater} from "../../redux/message-reducer";



export type DialogsPropsType = {
    dialogs: DialogsType
    messages: MessagesType
    dispatch: any
    newMassageBody: any
}

const Dialogs = (props: DialogsPropsType) => {
    const dialogsElement = props.dialogs.map(d => < DialogItem name={d.name} id={d.id}/>)
    const messagesElement = props.messages.map(m => <Message messageElement={m.message}/>)

    let newMassageBody = props.newMassageBody
    const onSendMassageClick = () => {
        props.dispatch(sendMessageCreater())
    }
    const onNewMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        // @ts-ignore
        props.dispatch(updateNewMessageBodyCreater(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <div><textarea
                        value={newMassageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your massage'></textarea></div>
                    <div>
                        <button onClick={onSendMassageClick}>send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;