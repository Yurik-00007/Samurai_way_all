import {AppRootStateType} from "./redux-store";

export const getUserProfileData = (state: AppRootStateType) => {
    return state.profilePage.userProfile
}
export const getStatusData = (state: AppRootStateType) => {
    return state.profilePage.status
}
export const getUserIdData = (state: AppRootStateType) => {
    return state.auth.userId
}
