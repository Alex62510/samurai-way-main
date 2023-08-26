import React, {FC} from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {UserContacts} from "./UserContacts";
import {Field, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";

type ProfileDataEditFormProps = {
    profile: ProfileType
}


export const ProfileDataEditForm: FC<ProfileDataEditFormProps> = ({profile}) => {
const onSubmit=()=>{
   alert('hi')
}
    return (
        <div>
            <div>
                <button onClick={() => {}}>save</button>
            </div>
            <ProfileEditForm profile={profile} onSubmit={onSubmit}/>
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
                <b>Full name: </b>{
                <Field component={Input} name="NameEdit" placeholder="Name"/>}
            </div>
            <div>
                <b>Looking for a job: </b>{
                <Field component={Input} name="LookingJob" placeholder="Look job" type={'checkbox'}/>}
            </div>
            <div>
                <b>My professional skills: </b>{
                <Field component={TextArea} name="My Professional Skills" placeholder="Looking for a job description" />}
            </div>
            <div>
                <b>About me: </b>{
                <Field component={TextArea} name="AboutMe" placeholder="AboutMe"/>}
            </div>
        </form>
    )
}
const ProfileEditForm = reduxForm<any,ProfileDataEditFormProps>({form: 'ProfileEdit'})(ProfileEdit)