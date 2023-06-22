import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {loginTC, logoutTC} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import ProfileContainer from "../Profile/ProfileContainer";
import {FormAction, FormErrors, stopSubmit} from "redux-form";

export type FormDataType = {
    //login=email
    email: string
    password: string
    rememberMe: boolean
}
type LoginType = MapStatePropsType & MapDispatchToPropsType


const Login: React.FC<LoginType> = (props) => {
    const onSubmitHandler = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData
        props.login(email, password, rememberMe, stopSubmit)
    }
    if (props.isAuth) {
        return <ProfileContainer/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitHandler}/>
        </div>
    );

};


type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, stopSubmit: (form: string, errors?: FormErrors | undefined) => FormAction) => void
    logout: () => void
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,
    {login: loginTC, logout: logoutTC})(Login)




