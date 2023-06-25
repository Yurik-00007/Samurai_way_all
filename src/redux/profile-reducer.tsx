import {AddMessageACType} from "./dialogs-reducer";
import {profileAPI, usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";


export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}


export type PhotosType = {
    small: string
    large: string
}

export type ContactsType = {
    [key: string]: string;
};

export  type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string | null
    contacts: ContactsType
    photos: PhotosType
}
export  type StatusType = string


//export type _InitialStateType = typeof initialState
export type InitialStateType = {
    posts: PostsType[]
    userProfile: UserProfileType
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
    userProfile: {
        "aboutMe": "",
        "contacts": {
            "facebook": "",
            "website": '',
            "vk": "",
            "twitter": "",
            "instagram": "",
            "youtube": '',
            "github": "",
            "mainLink": ''
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "",
        "fullName": "",
        "userId": 2,
        "photos": {
            "small": "",
            "large": ""
        }
    },
    status: ''
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => {

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
            return {...state, userProfile: {...state.userProfile, photos: action.payload.photos} as UserProfileType}
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
//export type StopSubmitType = ReturnType<typeof stopSubmit>
//AC
export const addPostActionCreater = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        payload: {
            newPostText
        }
    } as const
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
export const savePhotoSuccessAC = (photos: PhotosType) => {
    return {
        type: 'SAVE-PHOTO',
        payload: {
            photos
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
export const saveProfileTC = (profile: UserProfileType): AppThunk => async (dispatch, getState) => {
    const userId = getState().auth.userId as number
    const res = await profileAPI.saveProfile(profile)
    //debugger
    if (res.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId))
    } else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('edit-profile', {_error: message}))
        //dispatch(stopSubmit('edit-profile', {'contacts':{'facebook': res.data.messages[0]}}))
    return Promise.reject(message)
    }
}

