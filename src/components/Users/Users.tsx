import React, {FC, useEffect} from 'react';
import {FilterType, followUsersTC, getUsersTC, unfollowUsersTC} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./usersSearchForm/UsersSearchForm";
import {useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useAppDispatch} from "../../redux/redux-store";

type PropsType = {
}

export const Users: FC<PropsType> = (props) => {

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
    const follow = (userId: number) => {
        dispatch(followUsersTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUsersTC(userId))
    }

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, []);

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

