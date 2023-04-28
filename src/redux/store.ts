import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sideBarReducer from "./sideBar-reducer";
import {EmptyObject} from "redux";

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi how are you?', likesCount: "12"},
                {id: 2, message: "It's my first post", likesCount: "44"},
            ],
            newPostText: "It kamasytra.com"
        },
        messagePage: {
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
        },
        sideBar: {}
    },
    _callSubcraber(state: any) {
        console.log("State changed")
    },
    getState() {
        return this._state
    },
    subscrabe(observer: any) {
        this._callSubcraber = observer
    },
    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagePage = messageReducer(this._state.messagePage, action)
        this._state.sideBar = sideBarReducer(this._state.sideBar, action)

        this._callSubcraber(this._state)
    }
}
export type StateType = {
    profilePage: { posts: PostsType, newPostText: NewPostTextType }
    messagePage: { dialogs: DialogsType, messages: MessagesType, newMessageBody: string }
    sideBar: SideBarType
}

export type StoreType = {
    _state: StateType
    _callSubcraber: (state: StateType) => void
    getState: () => StateType
    subscrabe: (calback: () => void) => void
    dispatch: (action: any) => void

}
export type NewPostTextType = string
export type SideBarType = {}
export type PostType = {
    id: number
    message: string
    likesCount: string
}
export type PostsType = Array<PostType>
export type DialogType = {
    id: number
    name: string
}
export type DialogsType = Array<DialogType>
export type MessageType = {
    id: number
    message: string
}
export type MessagesType = Array<MessageType>

export default store