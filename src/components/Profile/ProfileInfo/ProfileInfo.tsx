import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css'
import {ProfileType, StatusType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userImg from '../../../assets/images/cat.png'
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType
    status: StatusType
    updateUserStatus: (newStatus: string) => void
    isOwner:boolean
    savePhoto:(photo:File)=>void
}

export const ProfileInfo = (props: ProfileInfoType) => {

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e?.target?.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }
        return (
            <div>
                <div>
                </div>
                <div className={s.discriptionBlock}>
                    <div>{props.profile.userId}</div>
                    <img
                    className={s.mainPhoto}
                        src={props.profile.photos.large ? props.profile.photos.large : userImg}/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                    {/*<ProfileStatus {...props}/>*/}
                    <ProfileStatusWithHooks {...props}/>

                    <div>Обо мне: {props.profile.aboutMe}</div>
                    <div>facebook: {props.profile.contacts.facebook}</div>
                    <div>twitter: {props.profile.contacts.twitter}</div>
                    <div>instagram: {props.profile.contacts.instagram}</div>
                    <div>facebook: {props.profile.contacts.facebook}</div>
                    <div>LookingForAJob:{props.profile.lookingForAJob
                        ? <img src={'https://novvedomosti.ru/images/articles/e4k7crpyuu.jpg'}/>
                        : <img
                            src={'https://img2.doktornarabote.ru/image/publicationthumbnailattachment/838bb331-74e4-4596-9d57-e6947cd515bd'}/>}
                    </div>
                    <div>fullName:{props.profile.fullName.toUpperCase()}</div>

                    ava+discription
                </div>

            </div>
        )

}
