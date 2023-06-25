import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {getCaptchaUrlTC, loginTC, logoutTC} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import ProfileContainer from "../Profile/ProfileContainer";
import {FormAction, FormErrors, stopSubmit} from "redux-form";

export type FormDataType = {
    //login=email
    email: string
    password: string
    rememberMe: boolean
    captcha:string|null
}
type LoginType = MapStatePropsType & MapDispatchToPropsType


const Login: React.FC<LoginType> = (props) => {
    const onSubmitHandler = (formData: FormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        props.login(email, password, rememberMe, captcha)
    }
    if (props.isAuth) {
        return <ProfileContainer/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitHandler} captchaUrl={props.captchaUrl}/>
        </div>
    );

};


type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean,captcha:string|null ) => void
    logout: () => void
    getCaptchaUrl:()=>void
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect(mapStateToProps,
    {login: loginTC, logout: logoutTC,getCaptchaUrl:getCaptchaUrlTC})(Login)




