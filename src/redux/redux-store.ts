import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ProfileActionTypes, profileReducer} from "./profile-reducer";
import {DialogsActionTypes, dialogsReducer} from "./dialogs-reducer";
import {SidebarActionTypes, sidebarReducer} from "./sidebar-reducer";
import {UsersActionTypes, usersReducer} from "./users-reducer";
import {AuthActionTypes, authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer, stopSubmit} from "redux-form";
import {AppActionTypes, appReducer} from "./app-reducer";
//import {} from "redux-devtools-extension"

let reducer = combineReducers({
//let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})
export type AppRootStateType = ReturnType<typeof reducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//export let store = createStore(reducer, applyMiddleware(thunk))
export type StopSubmitType = ReturnType<typeof stopSubmit>

//все типы action для всего app
export type AppActionsType =
    | UsersActionTypes
    | AuthActionTypes
    | DialogsActionTypes
    | ProfileActionTypes
    | SidebarActionTypes
    | AppActionTypes
    | StopSubmitType


//https://docs.google.com/document/d/1xg6ZLT3z7qswgC5Zj03o_efe-vAc9uUSXyEKfoVCQf4/edit#heading=h.pgm8onpxmgg8
//типизация thunk
//https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
//документация
//// ThunkAction
// // 1 параметр - описываем, что возвращает thunk->ничего void
// // 2 параметр - типизация всего state приложения->AppRootStateType
// // 3 параметр - экстра аргументы->unknown
// // 4 параметр - все action типы всего App->AppActionsType
//Dispatch больше не нужен иначе будет ошибка!!!
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispath = typeof store.dispatch

// @ts-ignore
window.__store__ = store

