import {Dispatch} from "redux";
import {profileApi} from "../api/api";

const ADD_POST = "profile/ADD-POST"
const SET_USER_PROFILE = "profile/SET_USER_PROFILE"
const SET_STATUS = "profile/SET_STATUS"
const DELETE_POST = "profile/DELETE-POST"

type AddPostActionCreaterType = ReturnType<typeof addPostAC>
type SetUserProfileType = ReturnType<typeof setUserProfileAC>
type SetStatusACType = ReturnType<typeof setStatusAC>
type DeletePost = ReturnType<typeof deletePostAC>

export type ActionProfile = AddPostActionCreaterType
    | SetUserProfileType
    | SetStatusACType
    | DeletePost
export const addPostAC = (newPostText: string) => {
    return {type: ADD_POST, newPostText} as const
}
export const deletePostAC = (postId: number) => {
    return {type: DELETE_POST, postId} as const
}
export const setUserProfileAC = (profile: ProfileType | null) => {
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
export let initialState = {
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
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(t => t.id !== action.postId)}
        default:
            return state
    }
}
export const ProfileGetTC = (userId: number) => async (dispatch: Dispatch) => {
    const res = await profileApi.getProfile(userId)
    dispatch(setUserProfileAC(res.data))
}
export const GetStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    const res = await profileApi.getStatus(userId)
    dispatch(setStatusAC(res.data))
}
export const UpdateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    const res = await profileApi.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export default profileReducer