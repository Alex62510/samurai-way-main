const ADD_POST = "ADD-POST"
const UPDATED_NEW_POST_TEXT = "UPDATED_NEW_POST_TEXT"

type AddPostActionCreaterType = ReturnType<typeof addPostActionCreater>
type UpdateNewPostTextCreaterType = ReturnType<typeof updateNewPostTextCreater>

type Action = AddPostActionCreaterType | UpdateNewPostTextCreaterType
export const addPostActionCreater = () => {
    return {type: ADD_POST} as const
}
export const updateNewPostTextCreater = (text: any) => {
    return {type: UPDATED_NEW_POST_TEXT, newText: text} as const
}
let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: "12"},
        {id: 2, message: "It's my first post", likesCount: "44"},
    ],
    newPostText: "It kamasytra.com"
}
const profileReducer = (state = initialState, action: Action) => {
    let stateCopy
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: 4, message: state.newPostText, likesCount: "5"}
            return {...state,posts: [...state.posts,newPost],newPostText: ""}
        case UPDATED_NEW_POST_TEXT:
            return {...state,posts:[...state.posts], newPostText:action.newText}
        default:
            return state
    }
}

export default profileReducer