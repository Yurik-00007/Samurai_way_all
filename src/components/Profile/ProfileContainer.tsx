import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    getStatusTC,
    getUserProfileTC, savePhotoTC, saveProfileTC,
    updateStatusTC,
    UserProfileType
} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getStatusData, getUserIdData, getUserProfileData} from "../../redux/profile-selectors";
import s from './Profile.module.css'

class ProfileContainer extends React.Component<OwnProps> {

    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<OwnProps>, prevState: Readonly<{}>, snapshot?: any) {
        //debugger
        if(this.props.match.params.userId!== prevProps.match.params.userId) {
            //debugger
            this.refreshProfile()
        }    }

    render() {
        //console.log('RENDER PROFILE')
        return <div className={s.profileBlock}>
            <img className={s.pic} src="https://pibig.info/uploads/posts/2022-12/thumbs/1670289983_48-pibig-info-p-gori-sneg-pinterest-69.jpg" alt="profileImg"/>
            <Profile {...this.props}
                     profile={this.props.userProfile}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
            />


        </div>
    }
}


type MapStatePropsType = {
    userProfile: UserProfileType
    status: string
    userId: number | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (newStatus: string) => void
    savePhoto:(photo:File)=>void
    saveProfile:(data: UserProfileType) => Promise<void>

}


export type ProfilePageType = MapStatePropsType & MapDispatchPropsType
type OwnProps = RouteComponentProps<{ "userId": string }> & ProfilePageType

let mapStateToProps = (state: AppRootStateType) => {
    //console.log('mapStateToProps PROFILE')
    //debugger
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
        updateUserStatus: updateStatusTC,
        savePhoto:savePhotoTC,
        saveProfile:saveProfileTC
    }),
    WithAuthRedirect,
    withRouter,
)
(ProfileContainer)
