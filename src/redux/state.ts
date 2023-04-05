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
export type StateType={
    dialogs:DialogsType
        messages:MessagesType
        posts:PostsType

}
const state={
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
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: "12"},
        {id: 2, message: "It's my first post", likesCount: "44"},
    ]
}
export default state