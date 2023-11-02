import React, {FC} from 'react';
import {ApiUsersType, FilterType, getUsersTC} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./usersSearchForm/UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getPageSize,
    getTotalUsersCount, getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useAppDispatch} from "../../redux/redux-store";

export type UsersPropsType = {
    // totalItemsCount: number
    // pageSize: number
    // usersPage: ApiUsersType
    // currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    // onPageChanged: (pageNumber: number) => void
    // onFilterChanged: (filter: FilterType) => void
    // followInProgress: number[]
}

const Users: FC<UsersPropsType> = ({
                                       // usersPage,
                                       // onPageChanged,
                                       follow,
                                       unfollow,
                                       ...props
                                   }) => {
    const portionSize = 10

    const usersPage = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const followInProgress = useSelector(getFollowInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator
                portionSize={portionSize}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                currentPage={currentPage}
                totalItemsCount={totalItemsCount}
            />
            {usersPage.map((u, index) =>
                <div key={u.id}>
                    <User user={u} unfollow={unfollow} follow={follow} followInProgress={followInProgress}/>
                </div>
            )
            }
        </div>
    );
}

export default Users