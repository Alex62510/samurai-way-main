import {chatAPI, ChatMessageType, StatusType} from "../api/chat-api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, AppThunk} from "./redux-store";
import {Dispatch} from "redux";
import message from "../components/Dialogs/Message/Message";


const initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType
}
const chatReducer = (state: InitialStateType = initialState, action: ChatActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state, messages: [...state.messages, ...action.payload.messages]
            }
        case "SN/chat/STATUS_CHANGED":

            return {
                ...state, status: action.payload.status
            }
        default:
            return state
    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangingHandler: ((status: StatusType) => void) | null = null
const statusChangingHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangingHandler === null) {
        _statusChangingHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangingHandler
}
export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.start()

    chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", statusChangingHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangingHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatAPI.sendMessage(message)
}


const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: "SN/chat/MESSAGES_RECEIVED", payload: {messages}} as const
}
const statusChanged = (status: StatusType) => {
    return {type: "SN/chat/STATUS_CHANGED", payload: {status}} as const
}

type MessageReceivedType = ReturnType<typeof messagesReceived>
type StatusChangedType = ReturnType<typeof statusChanged>
export default chatReducer


export type InitialStateType = typeof initialState
export type ChatActionsType = MessageReceivedType | StatusChangedType