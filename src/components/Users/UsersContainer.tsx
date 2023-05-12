import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {ApiUsersType, followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

export type MapStateToPropsType={
    usersPage:ApiUsersType
}
export type MapDispatchToPropsType={
    follow:(userId: number)=>void
    unfollow: (userId: number) =>void
    setUsers:(users:ApiUsersType)=>void
}

export type MapUserPropsType=MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        usersPage: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers:(users:ApiUsersType)=>{
            dispatch(setUsersAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);