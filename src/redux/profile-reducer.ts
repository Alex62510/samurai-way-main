import {Dispatch} from "redux";
import {profileApi} from "../api/api";

const ADD_POST = "ADD-POST"
const UPDATED_NEW_POST_TEXT = "UPDATED_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

type AddPostActionCreaterType = ReturnType<typeof addPostActionCreater>
type UpdateNewPostTextCreaterType = ReturnType<typeof updateNewPostTextCreater>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusACType = ReturnType<typeof setStatusAC>

type Action = AddPostActionCreaterType
    | UpdateNewPostTextCreaterType
    | SetUserProfileType
    | SetStatusACType
export const addPostActionCreater = () => {
    return {type: ADD_POST} as const
}
export const updateNewPostTextCreater = (text: string) => {
    return {type: UPDATED_NEW_POST_TEXT, newText: text} as const
}
export const setUserProfile = (profile: ProfileType | null) => {
    return {type: SET_USER_PROFILE, profile} as const
}
export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status} as const
}
export type ProfileInitialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
    status: string
}
export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
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
    profile: null,
    status: ""
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
        case SET_STATUS:
            return {...state,status:action.status}
        default:
            return state
    }
}

export const ProfileGetTC = (userId: number) => (dispatch: Dispatch) => {
    profileApi.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}
export const GetStatusTC = (userId:number) => (dispatch: Dispatch) => {

    profileApi.getStatus(userId)
        .then(res => {
            dispatch(setStatusAC(res.data))
        })
}
export const UpdateStatusTC = (status:string) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status)
        .then(res => {

            if(res.data.resultCode===0){
                dispatch(setStatusAC(status))
            }
        })
}
export default profileReducer