import {AppRootStateType} from "../redux/redux-store";
import React, {Component, ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth,
    }
}
type MapStateToProps = ReturnType<typeof mapStateToProps>

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    //debugger
    const RedirectComponent = (props: MapStateToProps) => {
        //debugger
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectedComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectedComponent

}

