import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import React from "react";
import {DialogsPageType} from "./DialogsContainer";
import {AddMassageFormRedux} from "./AddMassageForm";

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    message: string | undefined
}

type DialogsPagePropsType = DialogsPageType

export type FormDataType = {
    newMessageBody: string
}

export const Dialogs = (props: DialogsPagePropsType) => {
    const addNewMassage = (formData: FormDataType) => {
        props.addMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>,)}
            </div>

            <div className={s.messages}>
                {props.messages.map(m => <Message key={m.id} message={m.message}/>)}

                <AddMassageFormRedux onSubmit={addNewMassage}/>
            </div>
        </div>
    )
}


