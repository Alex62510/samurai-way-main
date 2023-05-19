const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type SetUsersACType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type setUsersTotalCountType = ReturnType<typeof setUsersTotalCountAC>
type IsFetchingType = ReturnType<typeof isFetchingAC>


type Action =
    IsFetchingType
    | FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageType
    | setUsersTotalCountType
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

export type InitialUsersStateType = {
    users: ApiUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
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
    isFetching: true
}

const usersReducer = (state: InitialUsersStateType = initialState, action: Action): InitialUsersStateType => {
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
        default:
            return state
    }
}
export default usersReducer