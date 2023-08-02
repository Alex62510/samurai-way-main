import React, {FC} from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/free-user.png";
import {ApiUserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UsersPropsType = {
    user: ApiUserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followInProgress: number[]
}
const User:FC<UsersPropsType> = ({user,followInProgress,unfollow,follow}) => {
const u=user
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/Profile/' + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
          {u.followed
              ? <button
                  disabled={followInProgress.some(id => id === u.id)} onClick={() => {
                  follow(u.id)

              }}>Unfollow</button>
              : <button
                  disabled={followInProgress.some(id => id === u.id)} onClick={() => {
                  unfollow(u.id)

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
    );
}
export default User