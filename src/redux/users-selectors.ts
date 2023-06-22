import {AppRootStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}
/*

export const _getUsersSuper = createSelector(getUsersSelector, (users) => {
    debugger
    return users.filter(u => true)
})
export const getUsersSuper = createSelector(getUsersSelector, getIsLoading, (users, isLoading) => {
    debugger
    return users.filter(u => true)
})
*/
export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state: AppRootStateType) => {
    return state.usersPage.isLoading
}
export const getFollowingProgressValue = (state: AppRootStateType) => {
    return state.usersPage.followingProgressValue
}
