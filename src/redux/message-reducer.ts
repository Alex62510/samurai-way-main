import profileReducer from "./profile-reducer";

const UPDADED_NEW_MESSAGE_BODY = "UPDADED_NEW_MESSAGE_BODY"
const SEND_MESSAGE = "SEND_MESSAGE"

export const sendMessageCreater = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreater = (body: any) => ({type: UPDADED_NEW_MESSAGE_BODY, body: body})

let initialState={
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

 const messageReducer=(state=initialState,action:any)=>{
     switch (action.type) {
         case UPDADED_NEW_MESSAGE_BODY:
             state.newMessageBody = action.body
             break;
         case SEND_MESSAGE:
             let body = state.newMessageBody
             state.newMessageBody = ''
             state.messages.push({id: 5, message: body})
             break;
     }
     return state
}
export default messageReducer