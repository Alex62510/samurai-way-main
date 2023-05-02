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
export const setUsersAC = (users:InitialStateType) => {
    return {type: SET_USERS, users} as const
}
export type InitialStateType={
    users:UsersType[]
}
export type UsersType={
    id:number
    followed:boolean
    fullName:string
    status:string
    location:LocationType
}
export type LocationType={
    city:string
    country:string
}
let initialState:InitialStateType = {
    users: [
        {id: 1, followed: false, fullName: 'Dmitriy', status: "Boss", location: {city: "Minsk", country: "Belarus"}},
        {id: 2, followed: true, fullName: 'Alex', status: "Staff", location: {city: "Moskow", country: "Russia"}},
        {id: 1, followed: false, fullName: 'Sasha', status: "Staff", location: {city: "Kiev", country: "Ukraine"}},
        {id: 1, followed: true, fullName: 'Andrew', status: "Staff", location: {city: "Borisov", country: "Belarus"}},

    ]
}
const usersReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state,users:[...state.users,...action.users]}
        default:
            return state
    }
}

export default usersReducer