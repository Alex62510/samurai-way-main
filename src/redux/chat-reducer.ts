import {ChatMessageType} from "../api/chat-api";


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

const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: "SN/chat/MESSAGES_RECEIVED", payload: messages} as const
}
 type MessageReceivedType=ReturnType<typeof messagesReceived>
export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = MessageReceivedType