import React, {ChangeEvent, ChangeEventHandler, FC} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/free-user.png";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => any
    isOwner: boolean
    savePhoto: any
}

function ProfileInfo(props: ProfileInfoPropsType) {
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
                        <div>
                            <b> Full name:</b> {props.profile.fullName}
                        </div>
                        <div>
                            <b>Looking for a job: </b>{props.profile.lookingForAJob ? 'yes' : 'no'}
                        </div>
                        <div>
                            <b> About me: </b> {props.profile.aboutMe}
                        </div>
                        <div>
                            <b> Contacts: </b> <UserContacts contacts={props.profile.contacts}/>
                        </div>


                    </div>
                </div>}
        </div>
    )
}

type ContactProps = {
    contacts?: ContactsType

}
const UserContacts: FC<ContactProps> = ({contacts}) => {
    const contactTitle = contacts && Object.entries(contacts)
    return <div>
        <b>{contactTitle?.map(title => <div>
            <div>{title}</div>
        </div>)}
        </b>

    </div>
}
export default ProfileInfo;