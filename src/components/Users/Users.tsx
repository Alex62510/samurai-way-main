import React from 'react';
import {ApiUsersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    usersPage: ApiUsersType
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followInProgress: number[]
}
const Users = (props: UsersPropsType) => {

    return (
        <div>
            <Paginator
                onPageChanged={props.onPageChanged}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                totalUsersCount={props.totalUsersCount}
            />
            {props.usersPage.map((u, index) =>
                    <div key={u.id}>
                           <User user={u} unfollow={props.unfollow} follow={props.follow} followInProgress={props.followInProgress}/>
                    </div>
            )
            }
        </div>
    );
}
export default Users