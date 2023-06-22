import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectInArrayFollUnFoll} from "../utils/object-helpers";

export type UserType = {
    followed: boolean
    id: number
    name: string
    photos: { small: null | string, large: null | string }
    status: null | string
    uniqueUrlName: null
}


type InitialStateType = typeof initialState

let initialState = {
    users: [] as UserType[],
    pageSize: 20 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isLoading: false as boolean,
    followingProgressValue: [] as Array<number>,
    portionSize: 20 as number
}


export const usersReducer = (state: InitialStateType = initialState, action: UsersActionTypes) => {
    //debugger
    switch (action.type) {
        case 'FOLLOW':
            //debugger
            return {
                ...state,
                users: updateObjectInArrayFollUnFoll(state.users, action.payload.userId, 'id', {followed: true,})
                //state.users.map(u => u.id === action.payload.userId ? {...u, followed: true,} : u)
            };
        case "UNFOLLOW":
            //debugger
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case "SET-USERS":
            //console.log()
            //return {...state, users: [...action.payload.users, ...state.users]}
            return {...state, users: action.payload.users}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.payload.currentPage}
        case 'SET-TOTAL-USERS':
            //debugger
            return {...state, totalUsersCount: action.payload.totalUsers}
        case "TOGGLE-IS-LOADING":
            return {...state, isLoading: action.payload.isLoading}
        case "TOGGLE-FOLLOWING-IN-PROGRESS":
            return {
                ...state,
                followingProgressValue: action.payload.isFetching
                    ? [...state.followingProgressValue, action.payload.userId]
                    : state.followingProgressValue.filter(id => id !== action.payload.userId)
            }
        default:
            return state;
    }
}

export type UsersActionTypes =
    | FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToggleIsLoadingACType
    | ToggleFollowingInProgressACType


export type FollowACType = ReturnType<typeof followSuccess>
export type UnFollowACType = ReturnType<typeof unFollowSuccess>
export type SetUsersACType = ReturnType<typeof setUsers>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type ToggleIsLoadingACType = ReturnType<typeof toggleIsLoading>
export type ToggleFollowingInProgressACType = ReturnType<typeof toggleFollowingProgress>


export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}
export const unFollowSuccess = (userId: number)/*: AddPostType*/ => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}
export const setUsers = (users: UserType[]) => ({
    type: 'SET-USERS',
    payload: {
        users
    }
} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    payload: {
        currentPage
    }
} as const)
export const setTotalUsersCount = (totalUsers: number) =>
    ({
        type: 'SET-TOTAL-USERS',
        payload: {
            totalUsers
        }
    } as const)
export const toggleIsLoading = (isLoading: boolean) =>
    ({
        type: 'TOGGLE-IS-LOADING',
        payload: {
            isLoading
        }
    } as const)
export const toggleFollowingProgress = (followingProgressValue: boolean, userId: number) =>
    ({
        type: 'TOGGLE-FOLLOWING-IN-PROGRESS',
        payload: {
            isFetching: followingProgressValue,
            userId
        }
    } as const)

//thunk

export const getUsersTC = (page: number, pageSize: number) => {
    return (async (dispatch: Dispatch) => {
        dispatch(toggleIsLoading(true))
        dispatch(setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        //debugger
        dispatch(toggleIsLoading(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}

export const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let res = await apiMethod(userId)
    if (res.resultCode === 0) {
        //debugger
        dispatch(actionCreator(userId))
        //props.follow(u.id)
    }
    dispatch(toggleFollowingProgress(false, userId))
}


export const unFollowTC = (userId: number) => {
    return (async (dispatch: Dispatch) => {
        /*
                let apiMethod = usersAPI.unFollow.bind(usersAPI)
                let actionCreator = unFollowSuccess
                followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
        */
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)

    })
}
/*
export const unFollowTC = (userId: number) => {
    return (async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let res = await usersAPI.unFollow(userId)
        if (res.resultCode === 0) {
            //debugger
            dispatch(unFollowSuccess(userId))
            //props.follow(u.id)
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}
*/

/*
export const unFollowTC = (userId: number) => {
    return ((dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unFollow(userId)
            .then(res => {
                if (res.resultCode === 0) {
                    //debugger
                    dispatch(unFollowSuccess(userId))
                    //props.follow(u.id)
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    })
}
*/

export const followTC = (userId: number) => {
    return (async (dispatch: Dispatch) => {
        /*
                let apiMethod = usersAPI.follow.bind(usersAPI)
                let actionCreator = followSuccess
                followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
        */
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    })
}
/*
export const followTC = (userId: number) => {
    return (async (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let res = await usersAPI.follow(userId)
        if (res.resultCode === 0) {
            //debugger
            dispatch(followSuccess(userId))
            //props.follow(u.id)
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}
*/
/*
export const followTC = (userId: number) => {
    return ((dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(res => {
                if (res.resultCode === 0) {
                    //debugger
                    dispatch(followSuccess(userId))
                    //props.follow(u.id)
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    })
}
*/

