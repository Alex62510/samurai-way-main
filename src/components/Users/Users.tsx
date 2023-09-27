import React, {FC} from 'react';
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

const Users:FC<UsersPropsType> = ({usersPage,onPageChanged,pageSize,totalItemsCount,currentPage,followInProgress,follow,unfollow, ...props}) => {
    const portionSize=10
    return (
        <div>
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