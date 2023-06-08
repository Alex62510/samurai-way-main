import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sideBarReducer from "./sideBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    usersPage:usersReducer,
    auth:authReducer
})
export type AppStateType=ReturnType<typeof rootReducer>
export let store = createStore(rootReducer)