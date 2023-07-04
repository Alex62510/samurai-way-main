import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
import SuperMyPostContainer from "./MyPosts/Post/MyPostsContainer";


export type ProfilepropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => any

}

const Profile = (props: ProfilepropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <SuperMyPostContainer />
        </div>
    )
}
export default Profile;