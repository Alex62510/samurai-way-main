import {chatAPI, ChatMessageType} from "../api/chat-api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import message from "../components/Dialogs/Message/Message";


const initialState = {
    messages: [] as ChatMessageType[]
}
const chatReducer = (state:InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state, messages: [...state.messages, ...action.payload]
            }
        default:
            return state
    }
}

let _newMessageHandler:((messages:ChatMessageType[])=>void) | null=null
const newMessageHandlerCreator=(dispatch:Dispatch)=> (messages:ChatMessageType[])=>{
    if (_newMessageHandler===null){
        _newMessageHandler=(messages)=>{
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
export const startMessagesListening=():ThinkType=>async (dispatch)=>{
   chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening=():ThinkType=>async (dispatch)=>{
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}


const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: "SN/chat/MESSAGES_RECEIVED", payload: messages} as const
}
 type MessageReceivedType=ReturnType<typeof messagesReceived>
export default chatReducer

type ThinkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType >

export type InitialStateType = typeof initialState
type ActionsType = MessageReceivedType