import React from 'react';
import {sendMessageCreater, updateNewMessageBodyCreater} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {StateType} from "../../redux/store";
import {connect} from "react-redux";

export type DialogsPropsType = {
    store: any
}
// const DialogsContainer = (props: DialogsPropsType) => {
//
//     const onSendMassageClick = () => {
//         props.store.dispatch(sendMessageCreater())
//     }
//     const onNewMessageChange = (body: string) => {
//         props.store.dispatch(updateNewMessageBodyCreater(body))
//     }
//     return (
//         <Dialogs
//             dialogs={props.store.getState().messagePage.dialogs}
//             messages={props.store.getState().messagePage.messages}
//             newMassageBody={props.store.getState().messagePage.newMessageBody}
//             updateNewMessageBody={onNewMessageChange}
//             sendMessage={onSendMassageClick}/>
//     );
// };

let MapStateToProps = (state: StateType) => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
        newMassageBody: state.messagePage.newMessageBody
    }
}
let MapDispatchToProps = (dispatch: (action: any) => void) => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreater(body)),
        sendMessage: () => dispatch(sendMessageCreater())
    }
}
const SuperDialogsContainer = connect(MapStateToProps, MapDispatchToProps)(Dialogs)

export default SuperDialogsContainer;