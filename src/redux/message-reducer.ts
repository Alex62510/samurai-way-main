import profileReducer from "./profile-reducer";

const UPDADED_NEW_MESSAGE_BODY = "UPDADED_NEW_MESSAGE_BODY"
const SEND_MESSAGE = "SEND_MESSAGE"

export const sendMessageCreater = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreater = (body: any) => ({type: UPDADED_NEW_MESSAGE_BODY, body: body})


 const messageReducer=(state:any,action:any)=>{
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