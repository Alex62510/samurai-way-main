const store = {
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
            ]
        },
        sideBar: {}
    },
    getState() {
        return this._state
    },
    _callSubcraber(state: any) {
        console.log("State changed")
    },
    addPost() {
        const newPost = {id: 4, message: this._state.profilePage.newPostText, likesCount: "5"}
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._callSubcraber(this._state)
    },
    updatedNewPostText(newText: string) {

        this._state.profilePage.newPostText = newText
        this._callSubcraber(this._state)
    },
    subscraber(observer: any) {
        this._callSubcraber = observer
    }
}

export type StateType = {
    profilePage: { posts: PostsType, newPostText: NewPostTextType }
    messagePage: { dialogs: DialogsType, messages: MessagesType }
    sideBar: SideBarType
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