import React, {ChangeEvent, useEffect, useState} from 'react';
import {StatusType} from "../../redux/profile-reducer";

type ProfileStatusType = {
    status: StatusType
    updateUserStatus: (newStatus: string) => void

}


const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    //debugger
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        //debugger
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    /*
        {
            editMode: false,
            status: this.props.status
        }

        activateEditMode = () => {
            this.setState({editMode: true})
        }
        deactivateEditMode = () => {
            this.setState({editMode: false})
            this.props.updateUserStatus(this.state.status)
        }

        onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
            this.setState({status: e.currentTarget.value})
        }

        componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
            if (prevProps.status !== this.props.status) {
                this.setState({
                    status: this.props.status
                })
            }
        }
    */

    return (
        <>
            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '-------'}</span>
                </div>
                : <div>
                    <input autoFocus onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
                </div>
            }


        </>
    )

}


export default ProfileStatusWithHooks;