import React from 'react';

import styles from "./users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/free-user.png"

// type UsersPropsType = {
//     usersPage: ApiUsersType
//     follow: (id: number) => void
//     unfollow: (id: number) => void
//     setUsers: (users: ApiUsersType) => void
// }
export type ApiUsersType = Array<ApiUserType>
export type ApiUserType = {
    name: string
    id: number
    uniqueUrlName: string
    "photos": {
        "small": string
        "large": string
    },
    "status": string
    "followed": boolean
}

class Users extends React.Component<any, any> {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        })
    }
    render() {
        return (
            <div>

                {
                    this.props.usersPage.map((u: any) =>
                        <div key={u.id}>
<span>
    <div>
        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
    </div>
    <div>
        {u.followed ? <button onClick={() => {
            this.props.unfollow(u.id)
        }}>UnFollow</button> : <button onClick={() => {
            this.props.follow(u.id)
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
                        </div>)
                }

            </div>
        );
    }
}

export default Users;