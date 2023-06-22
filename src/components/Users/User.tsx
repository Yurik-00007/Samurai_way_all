import React from 'react';
import s from "./users.module.css";
import autoPhotoCat from "../../assets/images/cat.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

type PropsType = {
    user: UserType
    followingProgressValue: number[]
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void

}

const User = ({user, followingProgressValue, followTC, unFollowTC}: PropsType) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img className={s.userPhoto}
                                     src={user.photos.small !== null ? user.photos.small : autoPhotoCat}
                                     alt=""/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ?
                                <button
                                    onClick={() => {
                                        unFollowTC(user.id)
                                    }}
                                    disabled={followingProgressValue.some(id => id === user.id)}
                                >UnFollow</button>
                                :
                                <button onClick={() => {
                                    followTC(user.id)
                                }}
                                        disabled={followingProgressValue.some(id => id === user.id)}
                                >Follow</button>


                            }
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.id}</div>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
        </div>
    )
}

export default User;