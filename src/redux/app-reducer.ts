import {AppThunk} from "./redux-store";
import {getAuthUserDataTC} from "./auth-reducer";


let initialState = {
    isInitialized: false,
}
type InitialState = typeof initialState

export const appReducer = (state: InitialState = initialState, action: AppActionTypes): InitialState => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state, isInitialized: true}
        default:
            return state;
    }
}


export type AppActionTypes = InitializedSuccessACType

type InitializedSuccessACType = ReturnType<typeof initializedSuccessAC>

export const initializedSuccessAC = () => {
    return {
        type: 'INITIALIZED-SUCCESS',
    } as const
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
    let promise = dispatch(getAuthUserDataTC())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAC())
        })


}

