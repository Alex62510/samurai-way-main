import {AppThunk} from "./redux-store";

import {authMeTC} from "./auth-reducer";


const INITIALIZED_SUCCESS = "SET-INITIALIZED"


type InitializedSuccessACType = ReturnType<typeof initializedSuccessAC>

export type ActionApp = InitializedSuccessACType



export type InitialAppStateType = {
    initialized: boolean,
}
const initialState: InitialAppStateType = {
    initialized: false,

}
const appReducer = (state: InitialAppStateType = initialState, action: ActionApp): InitialAppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized:true}
        default:
            return state
    }
}
export const initializedSuccessAC = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}

export const initializedApp = (): AppThunk => (dispatch) => {
 let promise= dispatch(authMeTC())

    Promise.all([promise]).then(()=>{
        console.log()
        dispatch(initializedSuccessAC())
    })

}


export default appReducer