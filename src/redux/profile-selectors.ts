import {AppStateType} from "./redux-store";

export const getProfilePage = (state: AppStateType) => {
    return state.profilePage.profile
}
export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.status
}
export const getUserId = (state: AppStateType) => {
    return state.auth.userID
}
export const getAuth = (state: AppStateType) => {
    return state.auth.isAuth
}