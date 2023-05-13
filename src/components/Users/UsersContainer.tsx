import React from 'react';
import {connect} from "react-redux";
import {
    ApiUsersType,
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import axios from "axios";
import Users from "./Users";

export type MapStateToPropsType={
    usersPage:ApiUsersType
    pageSize:number
    totalUsersCount:number
    currentPage:number
}
export type MapDispatchToPropsType={
    follow:(userId: number)=>void
    unfollow: (userId: number) =>void
    setUsers:(users:ApiUsersType)=>void
    setCurrentPage:(currentPage:number)=>void
    setTotalUsersCount:(totalCount:number)=>void
}

export type MapUserPropsType=MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<MapUserPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }
    onPageChanged=(pageNumber:number)=>{
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }
    render() {
        return <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            usersPage={this.props.usersPage}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
        />
    }
}
const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        usersPage: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage
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
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount:(totalCount:number)=>{
            dispatch(setUsersTotalCountAC(totalCount))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);