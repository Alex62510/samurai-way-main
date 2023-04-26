import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sideBarReducer from "./sideBar-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer
})
export let store = createStore(reducers)