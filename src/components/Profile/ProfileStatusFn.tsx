import React, {useState} from 'react';

type ProfileStatusType = {
    status: string
}

const ProfileStatus1: React.FC<ProfileStatusType> = ({status}) => {
    const [state, setState] = useState({editMode: false});

    const activateEditMode = () => {
        setState({...state, editMode: true});
    }

    const deactivateEditMode = () => {
        setState({...state, editMode: false});
    }

    return (
        <>
            {!state.editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{status}</span>
                </div>
                :
                <div>
                    <input value={status} autoFocus onBlur={deactivateEditMode}/>
                </div>
            }
        </>
    )
}

export default ProfileStatus1;