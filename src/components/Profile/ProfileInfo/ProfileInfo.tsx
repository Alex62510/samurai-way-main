import React, {ChangeEvent, FC, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/free-user.png";
import {ProfileDataEditForm} from "./ProfileDataEditForm";
import {UserContacts} from "./UserContacts";
import {Button} from "antd";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => any
    isOwner: boolean
    savePhoto: any
    saveProfile:any
}

function ProfileInfo(props: ProfileInfoPropsType) {
    const [editMode,setEditMode]=useState<boolean>(false)

    const changeData =()=>{
        setEditMode(true)
    }
    const mainPhotoSelectOn = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            {
                !props.profile ? <Preloader/> : <div>
                    <div>
                        <img
                            src={"https://wonder-day.com/wp-content/uploads/2020/04/wonder-day-images-rainbow-37-1024x576.jpg"}/>
                    </div>
                    <div className={s.descriptionBlock}>
                        <img src={props.profile.photos.large || userPhoto} className={s.avatarPhoto}/>
                        {props.isOwner && <input type={"file"} onChange={mainPhotoSelectOn}/>}
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                        {editMode ?
                            <ProfileDataEditForm setEditMode={setEditMode} profile={props.profile} saveProfile={props.saveProfile}/> :
                            <ProfileData profile={props.profile} isOwner={props.isOwner} changeData={changeData}/> }
                    </div>
                </div>}
        </div>
    )
}

type ProfileDataProps = {
    profile: ProfileType
    isOwner: boolean
    changeData:()=>void
}
const ProfileData: FC<ProfileDataProps> = ({profile,isOwner,changeData}) => {
    return (
        <div>
            {isOwner && <div> <Button onClick={changeData}>EditData</Button></div>}
            <div>
                <b> Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>Professionals skills: </b>{profile.lookingForAJobDescription}
            </div>
            <div>
                <b> About me: </b> {profile.aboutMe}
            </div>
            <b> Contacts: </b> <UserContacts contacts={profile.contacts}/>
        </div>
    )
}


export default ProfileInfo;