import React from 'react';
import {
    DialogsType,
    MessagesType,
    sendMessageCreater,

} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
    }
}
let MapDispatchToProps = (dispatch: Dispatch) => {
    return {

        sendMessage: (value:string) => dispatch(sendMessageCreater(value))
    }
}

// const DialogsContainer = WithAuthRedirect(connect(MapStateToProps, MapDispatchToProps)(Dialogs))

export default compose<React.ComponentType>(connect(MapStateToProps, MapDispatchToProps),WithAuthRedirect)(Dialogs);