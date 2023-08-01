import {Dispatch} from "redux";
import {userApi} from "../api/api";

const FOLLOW = "samurai/user/FOLLOW"
const UNFOLLOW = "samurai/user/UNFOLLOW"
const SET_USERS = "samurai/user/SET-USERS"
const SET_CURRENT_PAGE = "samurai/user/SET_CURRENT_PAGE"
const SET_USERS_TOTAL_COUNT = "samurai/user/SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "samurai/user/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "samurai/user/TOGGLE_IS_FOLLOWING_PROGRESS"

type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type SetUsersACType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type setUsersTotalCountType = ReturnType<typeof setUsersTotalCountAC>
type IsFetchingType = ReturnType<typeof isFetchingAC>
type FollowingInProgressACType = ReturnType<typeof followingInProgressAC>

export type ActionUsers =
    IsFetchingType
    | FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageType
    | setUsersTotalCountType
    | FollowingInProgressACType

export const followAC = (userId: number) => {
    return {type: FOLLOW, userId} as const
}
export const unfollowAC = (userId: number) => {
    return {type: UNFOLLOW, userId} as const
}
export const setUsersAC = (users: ApiUsersType) => {
    return {type: SET_USERS, users} as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage} as const
}
export const setUsersTotalCountAC = (totalCount: number) => {
    return {type: SET_USERS_TOTAL_COUNT, totalCount} as const
}
export const isFetchingAC = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, isFetching} as const
}
export const followingInProgressAC = (isFetching: boolean, userId: number) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const
}
export type InitialUsersStateType = {
    users: ApiUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followInProgress: number[]
}
export type ApiUsersType = Array<ApiUserType>
export type ApiUserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}
const initialState: InitialUsersStateType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followInProgress: []
}

const usersReducer = (state: InitialUsersStateType = initialState, action: ActionUsers): InitialUsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))
    const res = await userApi.getUsers(currentPage, pageSize)
    dispatch(isFetchingAC(false))
    dispatch(setUsersAC(res.items))
    dispatch(setUsersTotalCountAC(res.totalCount))

}
export const followUsersTC = (id: number) => async (dispatch: Dispatch) => {
    const apiMethod = userApi.followUsers.bind(userApi)
    const actionCreator = unfollowAC
    followUnfollow(dispatch, id, apiMethod, actionCreator)
}
export const unfollowUsersTC = (id: number) => async (dispatch: Dispatch) => {
    const apiMethod = userApi.unfollowUsers.bind(userApi)
    const actionCreator = followAC
    followUnfollow(dispatch, id, apiMethod, actionCreator)
}
const followUnfollow = async (dispatch: Dispatch, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(followingInProgressAC(true, id))
    const res = await apiMethod(id)
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(followingInProgressAC(false, id))
}
export default usersReducer