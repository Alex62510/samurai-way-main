import {authApi, ResultCode, securityApi} from "../api/api";
import {AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";


const SET_USER_DATA = "samurai/auth/SET-USER-DATA"
const GET_CAPTCHA_URL_SUCCESS = "samurai/auth/GET_CAPTCHA_URL_SUCCESS"


type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>
type GetCaptchaUrlACType = ReturnType<typeof getCaptchaUrlSuccessAC>

export type ActionAuth =
    | SetUserDataACType
    | FormAction
    | GetCaptchaUrlACType

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    userID: null as number | null,
    captchaUrl: null as string | null,
}
export type InitialAuthStateType=typeof initialState
const authReducer = (state: InitialAuthStateType = initialState, action: ActionAuth): InitialAuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state,...action.payload}
        default:
            return state
    }
}
export const setAuthUserDataAC = (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {userID, email, login, isAuth}
    } as const
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
    } as const
}
export const authMeTC = (): AppThunk => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === ResultCode.Success) {
        let {id, email, login} = res.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean,captcha:string): AppThunk => async (dispatch) => {
    const res = await authApi.login(email, password, rememberMe,captcha)
    if (res.resultCode === ResultCode.Success) {
        dispatch(authMeTC())
    } else {
        if(res.resultCode===ResultCode.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = res.messages.length > 0 ? res.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
    const res = await securityApi.getCaptchaUrl()
    const captchaUrl = res.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))
}
export const logout = (): AppThunk => async (dispatch) => {
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export default authReducer