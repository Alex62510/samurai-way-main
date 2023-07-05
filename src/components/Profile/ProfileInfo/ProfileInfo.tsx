import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus";


type ProfileInfoPropsType={
    profile:ProfileType | null
    status:string
    updateStatus:(status: string) => any
}
function ProfileInfo(props:ProfileInfoPropsType) {
    return (
        <div>
            {
                !props.profile ? <Preloader/>: <div>
                    <div>
                        <img
                            src={"https://wonder-day.com/wp-content/uploads/2020/04/wonder-day-images-rainbow-37-1024x576.jpg"}/>
                    </div>
                    <div className={s.descriptionBlock}>

                        <img src={props.profile.photos.large}/>
                        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                        <div>Full name: {props.profile.fullName}</div>
                       <div>contacts:{props.profile.contacts.github}</div>
                    </div>
                </div>  }
        </div>
    )
}

export default ProfileInfo;