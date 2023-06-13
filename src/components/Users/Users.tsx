import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/free-user.png";
import {ApiUsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import { userApi} from "../../api/api";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    usersPage: ApiUsersType
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress:(value:boolean,userId:number)=>void
    followInProgress:number[]
}

const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(t => <span onClick={(e) => {
                    props.onPageChanged(t)
                }} className={props.currentPage === t ? styles.selectedPage : ""}>{t}</span>)}
            </div>
            {props.usersPage.map((u) =>
                    <div key={u.id}>
                            <span>
    <div>
        <NavLink to={'/Profile/' + u.id}>
            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
        </NavLink>
    </div>
    <div>
        {u.followed
            ? <button disabled={props.followInProgress.some(id=>id===u.id)} onClick={() => {
                props.followingInProgress(true,u.id)
                userApi.followUsers(u.id)
                    .then(res => {
                       if (res.data.resultCode===0) {
                           props.unfollow(u.id)
                       }
                        props.followingInProgress(false,u.id)
                    })
                }}>Unfollow</button>
            : <button disabled={props.followInProgress.some(id=>id===u.id)} onClick={() => {
                props.followingInProgress(true, u.id)
                userApi.unfollowUsers(u.id)
                    .then(res => {
                        if (res.data.resultCode===0) {
                            props.follow(u.id)
                        }
                        props.followingInProgress(false,u.id)
                    })
                }}>Follow</button>}
    </div>
</span>
                        <span>
    <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
    </span>
    <span>
        <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
    </span>
</span>
                    </div>
            )
            }
        </div>
    );
}
export default Users