import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfileType, UpdateStatusTC} from "../../redux/profile-reducer";


export type ProfilepropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => any
    // updateStatus:
}

const Profile = (props: ProfilepropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;