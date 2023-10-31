import {Dispatch} from "redux";
import {userApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const FOLLOW = "samurai/user/FOLLOW"
const UNFOLLOW = "samurai/user/UNFOLLOW"
const SET_USERS = "samurai/user/SET-USERS"
const SET_CURRENT_PAGE = "samurai/user/SET_CURRENT_PAGE"
const SET_USERS_TOTAL_COUNT = "samurai/user/SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "samurai/user/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "samurai/user/TOGGLE_IS_FOLLOWING_PROGRESS"
const SET_FILTER = "samurai/user/SET_FILTER"

type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type SetUsersACType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type SetFilterType = ReturnType<typeof setFilterAC>
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
    | SetFilterType

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
export const setFilterAC = (filter: FilterType) => {
    return {type: SET_FILTER, payload: filter} as const
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
export type ApiUsersType = Array<ApiUserType>
export type ApiUserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: {
        small: string | null
        large: string | null
    },
    status: string
    followed: boolean
}
export const initialState = {
    users: [] as ApiUsersType,
    pageSize: 50 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type InitialUsersStateType = typeof initialState
export type FilterType = typeof initialState.filter

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
        case SET_FILTER:
            return {...state, filter: action.payload}
        default:
            return state
    }
}
type ThinkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionUsers>
export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterType): ThinkType => async (dispatch) => {
    dispatch(isFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))
    dispatch(setFilterAC(filter))

    const res = await userApi.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(isFetchingAC(false))
    dispatch(setUsersAC(res.items))
    dispatch(setUsersTotalCountAC(res.totalCount))

}
export const followUsersTC = (id: number): ThinkType => async (dispatch) => {
    const apiMethod = userApi.followUsers.bind(userApi)
    followUnfollow(dispatch, id, apiMethod, unfollowAC)
}
export const unfollowUsersTC = (id: number): ThinkType => async (dispatch) => {
    const apiMethod = userApi.unfollowUsers.bind(userApi)
    followUnfollow(dispatch, id, apiMethod, followAC)
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