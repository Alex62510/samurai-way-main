import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect, useSelector} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import style from './../common/FormsControls/FormsControls.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type CaptchaType = {
    captchaUrl: string
}
const maxLength10 = maxLengthCreator(20)
const LoginForm: React.FC<InjectedFormProps<FormDataType> & CaptchaType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input} validate={[required, maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required, maxLength10]}
                       type={"password"}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"Checkbox"}/>remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field component={Input} name={'captcha'} placeholder={'Antibot symbols'}/>}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType & CaptchaType, any>({form: "login"})(LoginForm)

type PropsType = {}


export const LoginPage:FC<PropsType> = (props) => {

    const captchaUrl = useSelector<AppStateType>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to="/Profile"/>
    }
    return <div>
        <h1>
            Login
        </h1>
        <div>Email: free@samuraijs.com</div>
        <div>Password: free</div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
};


