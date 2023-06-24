
import {AddPostACType, profileReducer, UserProfileType} from "./profile-reducer";
import {AddMessageACType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string | undefined
}

type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    //newMessageText: string
}

type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

type PofilePageType = {
    posts: PostsType[],
    //newPostText: string
    userProfile: UserProfileType
    status: string

}

type FriendsType = {
    id: number,
    name: string
}

type SidebarType = {
    friends: FriendsType[]
}

type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: PofilePageType
    sidebar: SidebarType

}


type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _reranderEntireTree: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void


}


type ActionTypes = AddPostACType | AddMessageACType


let store: StoreType = {
//export let store: StoreType = {
    _state: {
        dialogsPage: {
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
            //newMessageText: 'it-kamasutra.com',
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi,how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post!', likesCount: 11},
                {id: 3, message: 'Blalblat!', likesCount: 15},
                {id: 4, message: 'Dada?', likesCount: 17},
            ],
            //newPostText: 'it-kamasutra.com',
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
            status: '',
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
            ]
        },
    },
    getState() {
        return this._state
    },

    subscribe(observer: () => void) {
        this._reranderEntireTree = observer;
    },


    dispatch: function (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._reranderEntireTree()


    },
    _reranderEntireTree() {
        console.log('State was changed')
    },


}














