import {authApi} from "../api/api";
import {AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";


const SET_USER_DATA = "samurai/auth/SET-USER-DATA"


type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

export type ActionAuth =
    | SetUserDataACType
    | FormAction


export type InitialAuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    userID: number | null
}
const initialState: InitialAuthStateType = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
    userID: 0
}
const authReducer = (state: InitialAuthStateType = initialState, action: ActionAuth): InitialAuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export const setAuthUserDataAC = (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {userID, email, login, isAuth}
    } as const
}
export const authMeTC = (): AppThunk => async (dispatch) => {
    const res = await authApi.me()
    if (res.data.resultCode === 0) {
        let {id, email, login} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    const res = await authApi.login(email, password, rememberMe)
    if (res.data.resultCode === 0) {
        dispatch(authMeTC())
    } else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): AppThunk => async (dispatch) => {
    const res = await authApi.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export default authReducer