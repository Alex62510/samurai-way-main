import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ActionProfile} from "./profile-reducer";
import messageReducer, {ActionMessage} from "./message-reducer";
import sideBarReducer from "./sideBar-reducer";
import usersReducer, {ActionUsers} from "./users-reducer";
import authReducer, {ActionAuth} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app:appReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionType = ActionAuth | ActionMessage | ActionProfile | ActionUsers
export type AppThunk<ReturnType = void|any> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
