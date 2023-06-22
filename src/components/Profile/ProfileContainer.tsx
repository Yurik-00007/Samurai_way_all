import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    getStatusTC,
    getUserProfileTC,
    updateStatusTC,
    UserProfileType
} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getStatusData, getUserIdData, getUserProfileData} from "../../redux/profile-selectors";


class ProfileContainer extends React.Component<OwnProps> {

    componentDidMount() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.userId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)


    }


    render() {
        //console.log('RENDER PROFILE')
        return <div>
            <Profile {...this.props} profile={this.props.userProfile}/>


        </div>
    }
}


type MapStatePropsType = {
    userProfile: UserProfileType | null
    status: string
    userId: number | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (newStatus: string) => void
}


export type ProfilePageType = MapStatePropsType & MapDispatchPropsType
type OwnProps = RouteComponentProps<{ "userId": string }> & ProfilePageType

let mapStateToProps = (state: AppRootStateType) => {
    //console.log('mapStateToProps PROFILE')
    return {
        userProfile: getUserProfileData(state),
        status: getStatusData(state),
        userId: getUserIdData(state)
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileTC,
        getUserStatus: getStatusTC,
        updateUserStatus: updateStatusTC
    }),
    WithAuthRedirect,
    withRouter,
)
(ProfileContainer)
