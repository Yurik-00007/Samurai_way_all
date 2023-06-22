import {AddPostACType} from "./profile-reducer";
import {AddMessageACType} from "./dialogs-reducer";

export type SidebarActionTypes = AddPostACType | AddMessageACType


export type SidebarType = {
    friends: FriendsType[]
}

export type FriendsType = {
    id: number,
    name: string
}

let initialState = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
    ]
}

export const sidebarReducer = (state: SidebarType = initialState, action: SidebarActionTypes) => {

    return state
}