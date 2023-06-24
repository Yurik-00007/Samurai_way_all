import {
    addPostActionCreater, deletePostAC, InitialStateType,
    profileReducer, UserProfileType
} from "./profile-reducer";


let state: InitialStateType;
beforeEach(() => {
    state = {
        posts: [
            {id: 1, message: `Hi,how are you?`, likesCount: 12},
            {id: 2, message: `It\'s my first post!`, likesCount: 11},
            {id: 3, message: `Blalblat!`, likesCount: 15},
            {id: 4, message: `Dada?`, likesCount: 17},
        ],
        userProfile: {} as UserProfileType,
        status: ''

    }
})


test('length of posts should be incremented', () => {
    //1 исходные данные
    let action = addPostActionCreater('it-kamasutra.com')


//2 делаем какойто action
    let newState = profileReducer(state, action)

//3 что ожидаем получить
    expect(newState.posts.length).toBe(5)
})

test('massage should be correct', () => {
    //1 исходные данные
    let action = addPostActionCreater('it-kamasutra.com')


//2 делаем какойто action
    let newState = profileReducer(state, action)

//3 что ожидаем получить
    expect(newState.posts[0].message).toBe('it-kamasutra.com')
})

test('after deleting length of message should be decrement', () => {


    //1 исходные данные
    let action = deletePostAC(2)


//2 делаем какойто action
    let newState = profileReducer(state, action)

//3 что ожидаем получить
    expect(newState.posts.length).toBe(3)
})

test(`after deleting length of message shouldn't be decrement if id is incorrect`, () => {


    //1 исходные данные
    let action = deletePostAC(1000)


//2 делаем какойто action
    let newState = profileReducer(state, action)

//3 что ожидаем получить
    expect(newState.posts.length).toBe(4)
})
