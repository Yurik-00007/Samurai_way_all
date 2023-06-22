import {DialogsType, MessagesType} from "../components/Dialogs/Dialogs";
import {AddPostACType} from "./profile-reducer";

export type DialogsActionTypes = AddPostACType | AddMessageACType /*| UpdateNewMessageDialogTextACType*/


type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, message: 'Hello World'},
        {id: 2, message: 'How is your IT-KAMASUTRA'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yoyo'},
    ],

}

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionTypes) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messages.length + 1,
                message: action.newMessageBody
            }
            return {...state, messages: [...state.messages, newMessage]};
        default:
            return state;
    }
}

const ADD_MESSAGE = 'ADD-MESSAGE'

export type AddMessageACType = ReturnType<typeof addMessageActionCreater>

export const addMessageActionCreater = (newMessageBody: string) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    } as const
}


