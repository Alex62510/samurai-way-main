import React from 'react';
import {sendMessageCreater, updateNewMessageBodyCreater} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";

export type DialogsPropsType = {
    store: any
}
const DialogsContainer = (props: DialogsPropsType) => {

    const onSendMassageClick = () => {
        props.store.dispatch(sendMessageCreater())
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreater(body))
    }
    return (
        <Dialogs
            dialogs={props.store.getState().messagePage.dialogs}
            messages={props.store.getState().messagePage.messages}
            newMassageBody={props.store.getState().messagePage.newMassageBody}
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMassageClick}/>
    );
};
export default DialogsContainer;