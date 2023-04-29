const UPDADED_NEW_MESSAGE_BODY = "UPDADED_NEW_MESSAGE_BODY"
const SEND_MESSAGE = "SEND_MESSAGE"

type SendMessageCreaterType = ReturnType<typeof sendMessageCreater>
type UpdateNewMessageBodyCreaterType = ReturnType<typeof updateNewMessageBodyCreater>

type Action = SendMessageCreaterType | UpdateNewMessageBodyCreaterType

export const sendMessageCreater = () => {
    return {type: SEND_MESSAGE} as const
}
export const updateNewMessageBodyCreater = (body: string) => {
    return {type: UPDADED_NEW_MESSAGE_BODY, body: body} as const
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimich'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
    ],
    newMessageBody: ""
}

const messageReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case UPDADED_NEW_MESSAGE_BODY:
            return {...state, newMessageBody: action.body}
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {...state, newMessageBody: '', messages: [...state.messages, {id: 5, message: body}]}
        default:
            return state
    }
}
export default messageReducer