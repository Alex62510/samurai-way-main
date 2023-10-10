import React, {FC} from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControls/FormsControls.module.css";
import {sendMetrick} from "../../../utils/metric/metric";

type ProfileDataEditFormProps = {
    profile: ProfileType
    saveProfile: any
    setEditMode: any
}
type ProfileDataProps = {
    profile: ProfileType

}

export const ProfileDataEditForm: FC<ProfileDataEditFormProps> = ({profile, saveProfile, setEditMode}) => {
    const onSubmit = (formData: any) => {
        saveProfile(formData).then(()=>{
            setEditMode(false)
        })
        console.log(formData)
    }

    return (
        <div>
            <ProfileEditForm profile={profile} onSubmit={onSubmit} initialValues={profile}/>

        </div>
    )
}
type HandleSubmitProps = {
    handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    profile: ProfileType
}


const ProfileEdit: FC<HandleSubmitProps & InjectedFormProps> = ({handleSubmit, profile, error}) => {
    const contactTitle = profile.contacts && Object.entries(profile.contacts)

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {sendMetrick('reachGoal','EditButtonClick')
                }}>save
                </button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
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
                <Field component={TextArea} name="lookingForAJobDescription"
                       placeholder="Looking for a job description"/>}
            </div>
            <div>
                <b>About me: </b>{
                <Field component={TextArea} name="aboutMe" placeholder="AboutMe"/>}
            </div>
            <b> Contacts: </b>{<div>
            <b>{contactTitle?.map((title, index) => <div key={index}>
                <div className={s.contact}>{`${title[0]}:`}</div>
                <Field component={Input} name={'contacts.' + title[0]} placeholder={title[0]}/>
            </div>)}
            </b>
        </div>}
        </form>
    )
}
const ProfileEditForm = reduxForm<any, any>({form: 'ProfileEdit'})(ProfileEdit)