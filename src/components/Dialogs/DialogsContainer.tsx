import React from 'react';
import {sendMessageCreater, updateNewMessageBodyCreater} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {StateType} from "../../redux/store";
import {connect} from "react-redux";

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