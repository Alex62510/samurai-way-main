import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type FormDataType={
    login:string
    password:string
    rememberMe:boolean
}
const maxLength10=maxLengthCreator(10)
const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"Checkbox"} />remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)
const Login = () => {
    const onSubmit=(formData:FormDataType)=>{
        console.log(formData)
    }
    return <div>
        <h1>
            Login
        </h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

export default Login;