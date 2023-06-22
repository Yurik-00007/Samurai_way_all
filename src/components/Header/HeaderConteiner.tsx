import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";


class HeaderConteiner extends React.Component<HeaderPropsType> {


    render() {
        return <Header {...this.props} />
    }
}

type MapDispatchPropsType = {
    logout: () => void
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
export const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.email,

    }
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchPropsType

export default connect(mapStateToProps,
    {
        logout: logoutTC
    })(HeaderConteiner)