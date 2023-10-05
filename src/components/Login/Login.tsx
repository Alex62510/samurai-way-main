 import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
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
const LoginForm: React.FC<InjectedFormProps<FormDataType>&CaptchaType> = ({handleSubmit, error, captchaUrl }) => {
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
            {captchaUrl && <Field component={Input} name={'captcha'} placeholder={'Antibot symbols'} />}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType&CaptchaType,any>({form: "login"})(LoginForm)

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType=ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType=ReturnType<typeof mapDispatchToProps>
const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to="/Profile"/>
    }
    return <div>
        <h1>
            Login
        </h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
};
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    } as const
}
const mapDispatchToProps=()=>{
    return {login, logout}as const
}
export default connect(mapStateToProps, {login, logout})(Login);