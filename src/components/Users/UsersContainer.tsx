import React from 'react';
import {connect} from "react-redux";
import {

    ApiUsersType,
    followingInProgressAC, followUsersTC, getUsersTC,
    setCurrentPageAC, unfollowUsersTC,
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { userApi} from "../../api/api";
import {Dispatch} from "redux";

export type MapStateToPropsType = {
    usersPage: ApiUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followInProgress:number[]
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => any
    unfollow: (userId: number) => any
    setCurrentPage: (currentPage: number) => void
    followingInProgress: (followingInProgress: boolean,id:number) => void
    getUsers:(currentPage:number,pageSize:number)=>any
}
export type MapUserPropsType = MapStateToPropsType & MapDispatchToPropsType
class UsersContainer extends React.Component<MapUserPropsType> {
    componentDidMount() {

        this.props.getUsers(this.props.currentPage,this.props.pageSize)
        // this.props.toggleIsFetching(true)
        // userApi.getUsers(this.props.currentPage,this.props.pageSize)
        //     .then(response => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(response.items)
        //     this.props.setTotalUsersCount(response.totalCount)
        // })
    }
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber,this.props.pageSize)

        //
        // this.props.toggleIsFetching(true)
        // userApi.getUsers(pageNumber,this.props.pageSize)
        //     .then(response => {
        // this.props.toggleIsFetching(false)
        //     this.props.setUsers(response.items)
        // })
    }

    render() {
        // debugger
        // console.log(this.props.isFetching)
        return <>
            <div>
                {this.props.isFetching? <Preloader />: null}

            </div>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                usersPage={this.props.usersPage}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                // followingInProgress={this.props.followingInProgress}
                followInProgress={this.props.followInProgress}

            />
        </>
    }
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followInProgress:state.usersPage.followInProgress
    }
}
export default connect(mapStateToProps, {
    follow:followUsersTC,
    unfollow: unfollowUsersTC,
    setCurrentPage:setCurrentPageAC,
    followingInProgress:followingInProgressAC,
    getUsers:getUsersTC})(UsersContainer);