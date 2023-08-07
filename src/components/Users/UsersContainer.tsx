import React from 'react';
import {connect} from "react-redux";
import {
    ApiUsersType,
    followingInProgressAC,
    followUsersTC,
    getUsersTC,
    setCurrentPageAC,
    unfollowUsersTC,
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

export type MapStateToPropsType = {
    usersPage: ApiUsersType
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followInProgress: number[]
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => any
    unfollow: (userId: number) => any
    setCurrentPage: (currentPage: number) => void
    followingInProgress: (followingInProgress: boolean, id: number) => void
    getUsers: (currentPage: number, pageSize: number) => any
}

export type MapUserPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<MapUserPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            <div>
                {this.props.isFetching ? <Preloader/> : null}
            </div>
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                usersPage={this.props.usersPage}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followInProgress={this.props.followInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followInProgress: getFollowInProgress(state)
    }
}
export default connect(mapStateToProps, {
    follow: followUsersTC,
    unfollow: unfollowUsersTC,
    setCurrentPage: setCurrentPageAC,
    followingInProgress: followingInProgressAC,
    getUsers: getUsersTC
})(UsersContainer);