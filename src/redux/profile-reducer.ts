import {Dispatch} from "redux";
import {userApi} from "../api/api";

const ADD_POST = "ADD-POST"
const UPDATED_NEW_POST_TEXT = "UPDATED_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"

type AddPostActionCreaterType = ReturnType<typeof addPostActionCreater>
type UpdateNewPostTextCreaterType = ReturnType<typeof updateNewPostTextCreater>
type SetUserProfileType = ReturnType<typeof setUserProfile>

type Action = AddPostActionCreaterType | UpdateNewPostTextCreaterType | SetUserProfileType
export const addPostActionCreater = () => {
    return {type: ADD_POST} as const
}
export const updateNewPostTextCreater = (text: string) => {
    return {type: UPDATED_NEW_POST_TEXT, newText: text} as const
}
export const setUserProfile = (profile: ProfileType | null) => {
    return {type: SET_USER_PROFILE, profile} as const
}
export type ProfileInitialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
}
export type ProfileType = {

    aboutMe: string
    contacts: {
        facebook: string
        website: null | string
        vk: string
        twitter: string
        instagram: string
        youtube: null | string
        github: string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }

}
export type PostType = {
    id: number
    message: string
    likesCount: string
}
let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: "12"},
        {id: 2, message: "It's my first post", likesCount: "44"},
    ],
    newPostText: "It kamasytra.com",
    profile: null
}
const profileReducer = (state: ProfileInitialStateType = initialState, action: Action): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: 4, message: state.newPostText, likesCount: "5"}
            return {...state, posts: [...state.posts, newPost], newPostText: ""}
        case UPDATED_NEW_POST_TEXT:
            return {...state, posts: [...state.posts], newPostText: action.newText}
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const ProfileGetTC=(userId:number)=>(dispatch:Dispatch)=>{
    userApi.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
        }
export default profileReducer