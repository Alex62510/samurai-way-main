import React from "react";
import s from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <div className={s.content}>
            <div>
                <img
                    src={"https://wonder-day.com/wp-content/uploads/2020/04/wonder-day-images-rainbow-37-1024x576.jpg"}/>
            </div>
            <div>
                ava+description
            </div>
            <MyPosts />
        </div>
    )
}

export default Profile;