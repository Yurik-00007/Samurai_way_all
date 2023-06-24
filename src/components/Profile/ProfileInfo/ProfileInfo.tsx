import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {StatusType, UserProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userImg from '../../../assets/images/cat.png'
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";

export type ContactsType = {
    [key: string]: string;
};


type ProfileInfoType = {
    profile: UserProfileType
    status: StatusType
    updateUserStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (data: UserProfileType) => Promise<void>
}


export const ProfileInfo = (props: ProfileInfoType) => {
    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }
//debugger
    const onSubmitHandler = (formData: UserProfileType) => {
        //console.log(formData)
        //props.saveProfile(formData, stopSubmit)

          props.saveProfile(formData)
              .then(()=>{
                  setEditMode(false)
              })
    }
    return (
        <div>
            <div className={s.discriptionBlock}>
                <img
                    className={s.mainPhoto}
                    src={props.profile.photos.large ? props.profile.photos.large : userImg}
                    alt={''}/>
                {props.isOwner && <div><input type={"file"} onChange={onMainPhotoSelected}/></div>}
                {/*<ProfileStatus {...props}/>*/}
                <ProfileStatusWithHooks {...props}/>


                {editMode
                    //? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmitHandler}/>
                    ? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmitHandler}/>
                    : <ProfileData goToEditMode={() => setEditMode(true)} profile={props.profile}
                                   isOwner={props.isOwner}/>}
            </div>
        </div>
    )
}

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
                                     contactValue={props.profile && props.profile.contacts[k]}/>
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