import {Dispatch} from "redux";
import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "profile/ADD-POST"
const SET_USER_PROFILE = "profile/SET_USER_PROFILE"
const SET_STATUS = "profile/SET_STATUS"
const DELETE_POST = "profile/DELETE-POST"
const SAVE_PHOTO = "profile/SAVE_PHOTO"

type AddPostActionCreaterType = ReturnType<typeof addPostAC>
type SetUserProfileType = ReturnType<typeof setUserProfileAC>
type SetStatusACType = ReturnType<typeof setStatusAC>
type DeletePost = ReturnType<typeof deletePostAC>
type SavePhoto = ReturnType<typeof savePhotoSucsessAC>

export type ActionProfile = AddPostActionCreaterType
    | SetUserProfileType
    | SetStatusACType
    | DeletePost
    | SavePhoto
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
export const savePhotoSucsessAC = (photos: any) => {
    return {type: SAVE_PHOTO, photos} as const
}
export type ProfileType = {
    aboutMe?: string
    contacts?: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos: {
        large?: string,
        small?: string
    }
}
export type PostType = {
    id: number
    message: string
    likesCount: string
}
export type ContactsType={
    facebook:  string
    website:  string
    vk:  string
    twitter:  string
    instagram:  string
    youtube:  string
    github:  string
    mainLink:  string
};
export const initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: "12"},
        {id: 2, message: "It's my first post", likesCount: "44"},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string
}
type ProfileInitialStateType =typeof initialState
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
        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos:  action.photos}}
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
export const savePhotoTC = (file: string) => async (dispatch: Dispatch) => {
    const res = await profileApi.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoSucsessAC(res.data.data.photos))
    }
}
export const saveProfileTC = (profile: string) => async (dispatch: any,getState:any) => {
    const userId=getState().auth.userID

    const res = await profileApi.saveProfile(profile)

    if (res.data.resultCode === 0) {
        dispatch(ProfileGetTC(userId))
    } else {
        dispatch(stopSubmit("ProfileEdit",  {_error: res.data.messages[0]}  ))
        return Promise.reject(res.data.messages[0])
    }
}
export default profileReducer