import React from "react";
import {addMessageActionCreater} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {getDialogs, getMessages} from "../../redux/dialogs-selectors";


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>

export type DialogsPageType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),

    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: (newMessageBody: string) => {
            dispatch(addMessageActionCreater(newMessageBody))
        },
    }
}


export default WithAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))