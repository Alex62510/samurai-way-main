import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

const getUsersSelector=(state:AppStateType)=>{
    return state.usersPage.users
}

export const getUsers=createSelector(getUsersSelector,(users)=>{
    return users.filter(t=>true)
})
export const getPageSize=(state:AppStateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount=(state:AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state:AppStateType)=>{
    return state.usersPage.currentPage
}
export const getIsFetching=(state:AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowInProgress=(state:AppStateType)=>{
    return state.usersPage.followInProgress
}
export const getUsersFilter=(state:AppStateType)=>{
    return state.usersPage.filter
}
