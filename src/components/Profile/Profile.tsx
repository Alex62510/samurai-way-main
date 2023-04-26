import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {NewPostTextType, PostsType} from "../../redux/store";


export type ProfilePropsType = {
    posts: PostsType
    newPostText: NewPostTextType
    dispatch:any
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                dispatch={props.dispatch}
                newPostText={props.newPostText}

            />
        </div>
    )
}

export default Profile;