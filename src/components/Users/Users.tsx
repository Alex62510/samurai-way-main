import React from 'react';
import {UserType} from "../../redux/users-reducer";
import styles from "./users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/free-user.png"

type UsersPropsType = {
    // usersPage: Array<UserType>
    usersPage: any[]
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}

// export type ApiUsersType=ReturnType<typeof props.setUsers>
const Users = (props: UsersPropsType) => {

    const getUsers=()=>{
        if (props.usersPage.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })
    }}



    //
    //
    //     props.setUsers([{
    //         id: 1,
    //         photoUrl: "https://artist-production.de/wp-content/uploads/2023/04/dmitry-romanov-1.jpg",
    //         followed: false,
    //         fullName: 'Dmitriy',
    //         status: "Boss",
    //         location: {city: "Minsk", country: "Belarus"}
    //     },
    //         {
    //             id: 2,
    //             photoUrl: "https://static01.nyt.com/images/2023/01/09/multimedia/09BEETLEJUUICE_EXIT-1-77d3/09BEETLEJUUICE_EXIT-1-77d3-videoSixteenByNine3000.jpg",
    //             followed: true,
    //             fullName: 'Alex',
    //             status: "Staff",
    //             location: {city: "Moskow", country: "Russia"}
    //         },
    //         {
    //             id: 3,
    //             photoUrl: "https://noticiasdatv.uol.com.br/media/_versions/artigos_2021/sasha-meneghel-reproducao-globo-grande_fixed_large.jpg",
    //             followed: false,
    //             fullName: 'Sasha',
    //             status: "Staff",
    //             location: {city: "Kiev", country: "Ukraine"}
    //         },
    //         {
    //             id: 4,
    //             photoUrl: "https://content.api.news/v3/images/bin/615131aefb8405a4687daf730d5b2117",
    //             followed: true,
    //             fullName: 'Andrew',
    //             status: "Staff",
    //             location: {city: "Borisov", country: "Belarus"}
    //         },])
    // }

    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {
                props.usersPage.map(u => <div key={u.id}>
<span>
    <div>
        <img src={u.photos.small!==null? u.photos.small: userPhoto} className={styles.userPhoto}/>
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
                </div>)
            }

        </div>
    );
};

export default Users;