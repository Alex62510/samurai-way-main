import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";


export type ProfilepropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => any
    isOwner: boolean
    savePhoto:(file:any)=>any
    saveProfile:any
}

const Profile = (props: ProfilepropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         saveProfile={props.saveProfile}
            />
            <SuperMyPostContainer/>
        </div>
    )
}
export default Profile;