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
import WithAuthRedirect from "../../hoc/WithAuthRedirect";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMassageBody: string
    isAuth:boolean
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
        newMassageBody: state.messagePage.newMessageBody,
        isAuth: state.auth.isAuth
    }
}
let MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreater(body)),
        sendMessage: () => dispatch(sendMessageCreater())
    }
}
export const AuthRedirectComponent=WithAuthRedirect(Dialogs)
const DialogsContainer = connect(MapStateToProps, MapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;