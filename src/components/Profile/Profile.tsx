import React, {memo} from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType, StatusType} from "../../redux/profile-reducer";


export type ProfilePageType = {
    profile: ProfileType
    status: StatusType
    updateUserStatus: (newStatus: string) => void


}
export const Profile = (props: ProfilePageType) => {
    return <div>
        <ProfileInfo {...props} />
        <MyPostsContainer/>
    </div>
}
