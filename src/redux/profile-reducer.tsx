import {AddMessageACType} from "./dialogs-reducer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";


export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: (string)
    large: (string)
}

export  type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string | null
    contacts: ContactsType
    photos: PhotosType
}
export  type ProfileType = UserProfileType | null
export  type StatusType = string


export type _InitialStateType = typeof initialState
export type InitialStateType = {
    posts: PostsType[]
    userProfile: UserProfileType | null
    status: StatusType

}

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

export type ProfileActionTypes =
    | AddPostACType
    | AddMessageACType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostACType


let initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post!', likesCount: 11},
        {id: 3, message: 'Blalblat!', likesCount: 15},
        {id: 4, message: 'Dada?', likesCount: 17},
    ],
    userProfile: null,
    status: ''

}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.newPostText,
                likesCount: 0,
            }
            return {...state, posts: [newPost, ...state.posts]};
        case  SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};
        case "SET-STATUS":
            return {...state, status: action.payload.status}
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

        default:
            return state;
    }
}

//type
export type AddPostACType = ReturnType<typeof addPostActionCreater>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export type SetStatusACType = ReturnType<typeof setStatus>
export type DeletePostACType = ReturnType<typeof deletePostAC>
//AC
export const addPostActionCreater = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}

export const setUserProfileAC = (userProfile: UserProfileType) => ({
    type: SET_USER_PROFILE,
    userProfile
} as const)

export const setStatus = (newStatus: string) =>
    ({
        type: 'SET-STATUS',
        payload: {
            status: newStatus,
        }
    } as const)

export const deletePostAC = (postId: number) => {
    return {
        type: 'DELETE-POST',
        postId
    } as const
}


//thunk
export const getUserProfileTC = (userId: number): AppThunk => async dispatch => {
    const res = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(res.data))
}
/*
export const getUserProfileTC = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfileAC(res.data))
        });
}
*/
export const getStatusTC = (userId: number): AppThunk => async dispatch => {
    const res = await profileAPI.getStatus(userId)
    dispatch(setStatus(res.data))
}
/*
export const getStatusTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatus(res.data))
        });
}
*/
export const updateStatusTC = (newStatus: string): AppThunk => async dispatch => {
    const res = await profileAPI.updateStatus(newStatus)
    if (res.data.resultCode === 0)
        dispatch(setStatus(newStatus))
}
/*
export const updateStatusTC = (newStatus: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(newStatus)
        .then(res => {
            if (res.data.resultCode === 0)
                dispatch(setStatus(newStatus))
        });
}
*/

