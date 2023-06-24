import React, {memo} from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {StatusType, UserProfileType} from "../../redux/profile-reducer";


export type ProfilePageType = {
    profile: UserProfileType
    status: StatusType
    updateUserStatus: (newStatus: string) => void
    isOwner:boolean
    savePhoto:(photo:File)=>void
    saveProfile:(data: UserProfileType) => Promise<void>

}

export const Profile = (props: ProfilePageType) => {
    //debugger
    return <div>
        <ProfileInfo {...props} />
        <MyPostsContainer/>
    </div>
}
