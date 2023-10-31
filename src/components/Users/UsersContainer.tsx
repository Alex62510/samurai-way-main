import React from 'react';
import {connect} from "react-redux";
import {
    ApiUsersType, FilterType,
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
    getUsers, getUsersFilter
} from "../../redux/users-selectors";

export type MapStateToPropsType = {
    usersPage: ApiUsersType
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followInProgress: number[]
    filter:FilterType
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    followingInProgress: (followingInProgress: boolean, id: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage,filter,pageSize} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize,filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const { pageSize} = this.props
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                usersPage={this.props.usersPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
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
        followInProgress: getFollowInProgress(state),
        filter:getUsersFilter(state)
    }
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow: followUsersTC,
    unfollow: unfollowUsersTC,
    setCurrentPage: setCurrentPageAC,
    followingInProgress: followingInProgressAC,
    getUsers: getUsersTC
})(UsersContainer);