import {Dispatch} from "redux";
import {profileApi} from "../api/api";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

type AddPostActionCreaterType = ReturnType<typeof addPostActionCreater>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusACType = ReturnType<typeof setStatusAC>

export type ActionProfile = AddPostActionCreaterType
    | SetUserProfileType
    | SetStatusACType
export const addPostActionCreater = (newPostText:string) => {
    return {type: ADD_POST,newPostText} as const
}
export const setUserProfile = (profile: ProfileType | null) => {
    return {type: SET_USER_PROFILE, profile} as const
}
export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status} as const
}
export type ProfileInitialStateType = {
    posts: Array<PostType>
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
    profile: null,
    status: ""
}
const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionProfile): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: 4, message: action.newPostText, likesCount: "5"}
            return {...state, posts: [...state.posts, newPost]}
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