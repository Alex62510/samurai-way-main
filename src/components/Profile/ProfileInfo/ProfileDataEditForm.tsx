import React, {FC} from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {UserContacts} from "./UserContacts";
import {Field, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";

type ProfileDataEditFormProps = {
    profile: ProfileType
    saveProfile:any
    setEditMode:any
}
type ProfileDataProps = {
    profile: ProfileType

}

export const ProfileDataEditForm: FC<ProfileDataEditFormProps> = ({profile,saveProfile,setEditMode}) => {
const onSubmit=(formData:any)=>{
    saveProfile(formData)
    setEditMode(false)
}
    return (
        <div>
            <ProfileEditForm profile={profile} onSubmit={onSubmit} initialValues={profile}/>
            <b> Contacts: </b> <UserContacts contacts={profile.contacts}/>
        </div>
    )
}
type HandleSubmitrops = {
    handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    profile: ProfileType
}


const ProfileEdit = (props: HandleSubmitrops) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <button onClick={() => {}}>save</button>
            </div>
            <div>
                <b>Full name: </b>{
                <Field component={Input} name="fullName" placeholder="fullName"/>}
            </div>
            <div>
                <b>Looking for a job: </b>{
                <Field component={Input} name="LookingForAJob" placeholder="Look job" type={'checkbox'}/>}
            </div>
            <div>
                <b>My professional skills: </b>{
                <Field component={TextArea} name="lookingForAJobDescription" placeholder="Looking for a job description" />}
            </div>
            <div>
                <b>About me: </b>{
                <Field component={TextArea} name="aboutMe" placeholder="AboutMe"/>}
            </div>
        </form>
    )
}
const ProfileEditForm = reduxForm<any,ProfileDataProps>({form: 'ProfileEdit'})(ProfileEdit)