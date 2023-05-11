const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type SetUsersACType = ReturnType<typeof setUsersAC>

type Action = FollowACType | UnfollowACType | SetUsersACType
export const followAC = (userId: number) => {
    return {type: FOLLOW, userId} as const
}
export const unfollowAC = (userId: number) => {
    return {type: UNFOLLOW, userId} as const
}
export const setUsersAC = (users: ApiUsersType) => {
    return {type: SET_USERS, users} as const
}
export type InitialUsersStateType = {
    users: ApiUsersType
}
export type ApiUsersType = Array<ApiUserType>
export type ApiUserType = {
    name: string
    id: number
    uniqueUrlName: string
    "photos": {
        "small": string
        "large": string
    },
    "status": string
    "followed": boolean
}
const initialState: InitialUsersStateType = {
    users: []
}
const usersReducer = (state: InitialUsersStateType = initialState, action: Action): InitialUsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export default usersReducer