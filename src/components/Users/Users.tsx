import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/free-user.png";
import {ApiUsersType} from "../../redux/users-reducer";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    usersPage: ApiUsersType
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber:number) => void
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
        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
    </div>
    <div>
        {u.followed ? <button onClick={() => {
            props.unfollow(u.id)
        }}>UnFollow</button> : <button onClick={() => {
            props.follow(u.id)
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