import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {StateType} from "../../redux/store";
import {followAC, InitialStateType, setUsersAC, unfollowAC} from "../../redux/users-reducer";


const mapStateToProps = (state: StateType) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: (action:any) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers:(users:InitialStateType)=>{
            dispatch(setUsersAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);