import {chatAPI, ChatMessageType} from "../api/chat-api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, AppThunk} from "./redux-store";
import {Dispatch} from "redux";
import message from "../components/Dialogs/Message/Message";


const initialState = {
    messages: [] as ChatMessageType[]
}
const chatReducer = (state: InitialStateType = initialState, action: ChatActionsType): InitialStateType => {
    debugger
    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state, messages: [...state.messages, ...action.payload]
            }
        default:
            return state
    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) =>  {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.start()

    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatAPI.sendMessage(message)
}


const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: "SN/chat/MESSAGES_RECEIVED", payload: messages} as const
}
type MessageReceivedType = ReturnType<typeof messagesReceived>
export default chatReducer

type ThinkType = ThunkAction<Promise<void>, AppStateType, unknown, ChatActionsType>

export type InitialStateType = typeof initialState
export type ChatActionsType = MessageReceivedType