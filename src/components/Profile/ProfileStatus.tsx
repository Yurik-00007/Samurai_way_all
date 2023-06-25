import React, {ChangeEvent} from 'react';
import {StatusType} from "../../redux/profile-reducer";

type ProfileStatusType = {
    status: StatusType
    updateUserStatus: (newStatus: string) => void

}


class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
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

    render() {
        return (
            <>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '-------'}</span>
                    </div>
                    : <div>
                        <input onChange={this.onStatusChange}
                               value={this.state.status} autoFocus
                               onBlur={this.deactivateEditMode}/>
                    </div>
                }


            </>
        );
    }
}


export default ProfileStatus;