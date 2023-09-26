
const SEND_MESSAGE = "message/SEND_MESSAGE"

type SendMessageCreaterType = ReturnType<typeof sendMessageCreater>

export type ActionMessage = SendMessageCreaterType

export const sendMessageCreater = (newMessageBody:string) => {
    return {type: SEND_MESSAGE,newMessageBody} as const
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimich'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
    ] as Array<MessagesType>,

}
export type InitialMessageStateType = typeof initialState
const messageReducer = (state:InitialMessageStateType = initialState, action: ActionMessage):InitialMessageStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {...state, messages: [...state.messages, {id: 5, message: body}]}
        default:
            return state
    }
}
export default messageReducer