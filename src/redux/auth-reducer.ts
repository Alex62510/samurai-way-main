import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = "SET-USER-DATA"


type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

export type ActionAuth =
    | SetUserDataACType


export type InitialAuthStateType = {
    id: number|null,
    email: string|null,
    login: string|null,
    isAuth: boolean
}
const initialState: InitialAuthStateType = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}
const authReducer = (state: InitialAuthStateType = initialState, action: ActionAuth): InitialAuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export const setAuthUserDataAC = (userID: number| null, email: string| null, login: string| null,isAuth:boolean) => {
    return {
        type: SET_USER_DATA, payload: {userID, email, login,isAuth}
    } as const
}

    export const authMeTC=():AppThunk=>(dispatch)=>{
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                dispatch(setAuthUserDataAC(id, email, login,true))
            }
        })
}
export const login=(email:string,password:string,rememberMe:boolean):AppThunk=>(dispatch)=>{
    authApi.login(email,password,rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authMeTC())
            }
        })
}
export const logout=():AppThunk=>(dispatch)=>{
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null,false))
            }
        })
}

export default authReducer