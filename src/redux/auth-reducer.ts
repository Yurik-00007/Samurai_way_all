import {authMeAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA'
let initialState = {
    userId: 26920 as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean | null,
}
type InitialState = typeof initialState

export const authReducer = (state: InitialState = initialState, action: AuthActionTypes): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }
}


export type AuthActionTypes = SetUserDataACType
export type StopSubmitType = ReturnType<typeof stopSubmit>
type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => {
    //debugger
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            login,
            email,
            isAuth
        }
    } as const
}

//thunk
//then catch
/*
export const getAuthUserDataTC = (): AppThunk => dispatch => {
    return authMeAPI.getAuth()
        .then(data => {
            //console.log(typeof res.data.data.id)
            //debugger
            if (data.resultCode === 0) {
                let {id: userId, login, email} = data.data
                dispatch(setAuthUserDataAC(userId, login, email, true))
            }
        })
    //return 'yo'
}
*/

//async await
export const getAuthUserDataTC = (): AppThunk => async dispatch => {
    try {
        const data = await authMeAPI.getAuth()
        if (data.resultCode === 0) {
            let {id: userId, login, email} = data.data
            dispatch(setAuthUserDataAC(userId, login, email, true))
        }
    } catch (e) {

    } finally {

    }
}

export const loginTC =
    //типизациая thunk в thunk
    (email: string, password: string, rememberMe: boolean): AppThunk =>
        async dispatch => {
//Dispatch | ThunkDispatch<EmptyObject & any, unknown, FollowACType>
            let data = await authMeAPI.login(email, password, rememberMe)
            //console.log(typeof res.data.data.id)
            //debugger
            if (data.resultCode === 0) {
                dispatch(getAuthUserDataTC())
            } else {
                let message = data.messages.length > 0 ? data.messages : 'Some error'
                //console.log(stopSubmit('login', {_error: message}))

                dispatch(stopSubmit('login', {_error: message}))
            }
        }
/*
export const loginTC =
    //типизациая thunk в thunk
    (email: string, password: string, rememberMe: boolean): AppThunk =>
        (dispatch) => {
//Dispatch | ThunkDispatch<EmptyObject & any, unknown, FollowACType>
            authMeAPI.login(email, password, rememberMe)
                .then(data => {
                    //console.log(typeof res.data.data.id)
                    //debugger
                    if (data.resultCode === 0) {
                        dispatch(getAuthUserDataTC())
                    } else {
                        let message = data.messages.length > 0 ? data.messages : 'Some error'
                        //console.log(stopSubmit('login', {_error: message}))

                        dispatch(stopSubmit('login', {_error: message}))
                    }
                })
        }
*/

export const logoutTC =
    //типизациая thunk в thunk
    (): AppThunk =>
        async dispatch => {
            let data = await authMeAPI.logout()
            //console.log(typeof res.data.data.id)
            //debugger
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        }
/*
export const logoutTC =
    //типизациая thunk в thunk
    (): AppThunk =>
        (dispatch) => {
            authMeAPI.logout()
                .then(data => {
                    //console.log(typeof res.data.data.id)
                    //debugger
                    if (data.resultCode === 0) {
                        dispatch(setAuthUserDataAC(null, null, null, false))
                    }
                })
        }
*/
