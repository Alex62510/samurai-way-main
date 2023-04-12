import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {NewPostTextType, PostsType} from "../../redux/state";


export type ProfilePropsType = {
    posts: PostsType
    addPost: () => void
    newPostText: NewPostTextType
    updatedNewPostText: (newPostText: string) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addPost={props.addPost}
                newPostText={props.newPostText}
                updatedNewPostText={props.updatedNewPostText}
            />
        </div>
    )
}

export default Profile;