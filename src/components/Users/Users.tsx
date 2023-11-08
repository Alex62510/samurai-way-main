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

import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {}
type QueryParamsType ={
    term?: string,
    page?: string,
    friend?: string
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
    const history = useHistory()
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
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) {
            actualPage = Number(parsed.page)
        }
        if (parsed.term) {
            actualFilter = {...actualFilter, term: parsed.term as string}
        }
        if (parsed.friend) {
            actualFilter = {
                ...actualFilter,
                friend: parsed.friend === "null" ? null : parsed.friend === 'true' ? true : false
            }
        }
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, []);

    useEffect(() => {
        const query:QueryParamsType={}
        if(!!filter.term){query.term=filter.term}
        if(filter.friend!==null){query.friend=String(filter.friend)}
        if(currentPage!==1){query.page=String(currentPage)}

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);


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

