import {AppRootStateType} from "./redux-store";

export const getDialogs = (state: AppRootStateType) => {
    return state.dialogsPage.dialogs
}
export const getMessages = (state: AppRootStateType) => {
    return state.dialogsPage.messages
}
