const SET_USER_DATA = "SET-USER-DATA"


type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

type Action =
    | SetUserDataACType


export type InitialAuthStateType = {
    id: number,
    email: string,
    login: string,
    isAuth: boolean
}
const initialState: InitialAuthStateType = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}
const authReducer = (state: InitialAuthStateType = initialState, action: Action): InitialAuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data,isAuth:true}
        default:
            return state
    }
}
export const setAuthUserDataAC = (userID: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA, data: {userID, email, login}
    } as const
}
export default authReducer