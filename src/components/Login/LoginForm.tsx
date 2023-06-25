import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {required} from "../../utils/validators/validators";
import {createField, Input} from "../common/FormControles/FormsControles";
import {FormDataType} from "./Login";
import s from '../common/FormControles/FormsControls.module.css'
import {UserProfileType} from "../../redux/profile-reducer";

type LoginFormType = {
    captchaUrl: string|null
}

type LoginFormPropsType = InjectedFormProps<FormDataType, LoginFormType>


//export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormType> & LoginFormType> = ({
export const LoginForm: React.FC<LoginFormPropsType & LoginFormType> = ({captchaUrl,handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>

            {createField("email", 'Email', [required], Input, {type: "text"})}
            {createField("password", 'Password', [required], Input, {type: "password"})}
            {createField('remember me', '', null, Input, {type: "checkbox"}, 'remember me')}

            {/*
                <div>
                           <Field
                    type="text"
                    name={"email"}
                    placeholder={'Email'}
                    validate={[required]}
                    component={Input}/>
                </div>




            <div>
                <Field
                    type="password"
                    name={"password"}
                    placeholder={'Password'}
                    validate={[required]}
                    component={Input}/>
            </div>


            <div>remember me
                <Field
                    type="checkbox"
                    name={"rememberMe"}
                    component={Input}/>
            </div>
            */}

            {captchaUrl &&
                <img src={captchaUrl} alt=""/>
            }
            {captchaUrl &&
            createField("captcha", 'Symbols from image', [required], Input, {type: "text"})
            }

            {error && <div className={s.formSummeryError}>
                {error}
            </div>}
            <div>
                <button>LOGIN</button>
            </div>
        </form>
    );
};
export const LoginReduxForm = reduxForm<FormDataType, LoginFormType>({form: 'login'})(LoginForm)