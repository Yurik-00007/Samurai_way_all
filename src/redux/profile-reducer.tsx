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
    small: string
    large: string
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


//export type _InitialStateType = typeof initialState
export type InitialStateType = {
    posts: PostsType[]
    userProfile: UserProfileType | null
    status: StatusType

}

export type ProfileActionTypes =
    | AddPostACType
    | AddMessageACType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostACType
    | SavePhotoType


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
        case 'ADD-POST':
            let newPost = {
                id: state.posts.length + 1,
                message: action.payload.newPostText,
                likesCount: 0,
            }
            return {...state, posts: [newPost, ...state.posts]};
        case  'SET-USER-PROFILE':
            return {...state, userProfile: action.payload.userProfile};
        case "SET-STATUS":
            return {...state, status: action.payload.status}
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postId)}
        case "SAVE-PHOTO":
            return {...state, userProfile: {...state.userProfile, photos:{...state.userProfile?.photos,large:action.payload.photo} }}
        default:
            return state;
    }
}

//type
export type AddPostACType = ReturnType<typeof addPostActionCreater>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export type SetStatusACType = ReturnType<typeof setStatus>
export type DeletePostACType = ReturnType<typeof deletePostAC>
export type SavePhotoType = ReturnType<typeof savePhotoSuccessAC>
//AC
export const addPostActionCreater = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        payload: {
            newPostText
    } }as const
}

export const setUserProfileAC = (userProfile: UserProfileType) => ({
    type: 'SET-USER-PROFILE',
    payload: {
        userProfile
    }
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
        payload: {
            postId
        }
    } as const
}
export const savePhotoSuccessAC = (photo: File) => {
    return {
        type: 'SAVE-PHOTO',
        payload: {
            photo
        }
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

export const savePhotoTC = (photo: File): AppThunk => async dispatch => {
    const res = await profileAPI.savePhoto(photo)
        //debugger
    if (res.data.resultCode === 0)
        dispatch(savePhotoSuccessAC(res.data.data.photos))
}

