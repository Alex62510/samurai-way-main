import React from 'react';
import {ApiUsersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

export type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    usersPage: ApiUsersType
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followInProgress: number[]

}

const Users = (props: UsersPropsType) => {
    const portionSize=10
    return (
        <div>
            <Paginator
                portionSize={portionSize}
                onPageChanged={props.onPageChanged}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                totalItemsCount={props.totalItemsCount}
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