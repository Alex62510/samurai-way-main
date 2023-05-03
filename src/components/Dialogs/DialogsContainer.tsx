import React from 'react';
import {
    DialogsType,
    MessagesType,
    sendMessageCreater,
    updateNewMessageBodyCreater
} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMassageBody: string
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
        newMassageBody: state.messagePage.newMessageBody
    }
}
let MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreater(body)),
        sendMessage: () => dispatch(sendMessageCreater())
    }
}
const SuperDialogsContainer = connect(MapStateToProps, MapDispatchToProps)(Dialogs)

export default SuperDialogsContainer;