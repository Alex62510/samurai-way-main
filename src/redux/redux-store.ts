import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ActionProfile} from "./profile-reducer";
import messageReducer, {ActionMessage} from "./message-reducer";
import sideBarReducer from "./sideBar-reducer";
import usersReducer, {ActionUsers} from "./users-reducer";
import authReducer, {ActionAuth} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {useDispatch} from "react-redux";
import chatReducer from "./chat-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app:appReducer,
    chat:chatReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionType = ActionAuth | ActionMessage | ActionProfile | ActionUsers
export type AppThunk<ReturnType = void|any> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
