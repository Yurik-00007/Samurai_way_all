import {UserProfileType} from "../../../redux/profile-reducer";
import React from "react";
import s from "./ProfileInfo.module.css";

export type ProfileDataType = {
    profile: UserProfileType
    isOwner: boolean
    goToEditMode: () => void
}
export const ProfileData = (props: ProfileDataType) => {
    return (
        <>
            {props.isOwner && <div>
                <button onClick={props.goToEditMode}>Edit</button>
            </div>}
            <div><b>UserId</b>: {props.profile.userId}</div>
            <div><b>fullName</b>: {props.profile.fullName}</div>
            <div>
                <b>LookingForAJob</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
            </div>
            <div><b>About me</b>: {props.profile.aboutMe}</div>
            <b>Contacts</b>:
            {Object.keys(props.profile.contacts)

                .map((k) => {
                    return <Contacts key={k} contactTitle={k}
                                     contactValue={props.profile.contacts[k]}/>
                })}

        </>
    )
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null

}
export const Contacts = (props: ContactsPropsType) => {
    return (
        <div className={s.contacts}>
            <b>{props.contactTitle}</b>: {props.contactValue ?? '----'}
        </div>
    )
}