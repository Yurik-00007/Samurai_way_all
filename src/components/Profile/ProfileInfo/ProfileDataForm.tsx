import React from "react";
import {createField, Input, Textarea} from "../../common/FormControles/FormsControles";
import {InjectedFormProps, reduxForm} from "redux-form";
import {UserProfileType} from "../../../redux/profile-reducer";
import s from './ProfileInfo.module.css'


//type ProfileDataFormType = InjectedFormProps<UserProfileType,{x:number}>
type ProfileDataFormPropsType = { profile: UserProfileType }
//type ProfileDataFormType = InjectedFormProps<UserProfileType,{x:number,profile:UserProfileType}>
type ProfileDataFormType = InjectedFormProps<UserProfileType, ProfileDataFormPropsType>


//export const ProfileDataForm: React.FC<ProfileDataFormType &{x:number,profile:UserProfileType}> = (props) => {
export const ProfileDataForm: React.FC<ProfileDataFormType & ProfileDataFormPropsType> = ({handleSubmit,error,profile}) => {
//const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, {}, string> & ProfileDataType> = (props ) => {
//props.x
    //const {handleSubmit,error,profile}=props
    return (
        <form onSubmit={(...arg) => handleSubmit(...arg)}>
            <div>
                {/*{props.x}*/}
                <button>Save</button>
                {error && <div className={s.formSummeryError}>
                    {error}
                </div>}
            </div>
            {/*
            <div><b>UserId</b>: {props.profile.userId}</div>
            <div><b>fullName</b>: {props.profile.fullName}</div>
*/}
            <div>
                <b>fullName</b>:
                {createField('fullName', 'Full name', [], Input,)}
            </div>
            <div>
                <b>LookingForAJob</b>:
                {/*
                {props.profile.lookingForAJob ? 'yes' : 'no'}
*/}
                {createField('lookingForAJob', '', [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>:
                {/*{props.profile.lookingForAJobDescription}*/}
                {createField('lookingForAJobDescription', 'My professional skills', [], Textarea,)}
            </div>
            <div><b>About me</b>:
                {/*{props.profile.aboutMe}*/}
                {createField('aboutMe', 'About me', [], Textarea,)}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    //debugger
                    return <div className={s.contacts} key={key}>
                        <b>{key}:</b>{createField('contacts.'+key, key, [], Input,)}
                    </div>
                })}
            </div>

        </form>
    )
}


export const ProfileDataFormReduxForm = reduxForm<UserProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)