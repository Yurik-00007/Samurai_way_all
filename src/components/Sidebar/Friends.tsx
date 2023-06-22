import s from './Friends.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

export type SidebarType = {
    friends: FriendsType[]
}

export type FriendsType = {
    id: number,
    name: string
}

const friends: FriendsType[] = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
]

export const Friends = () => {

    let friendsElement = friends.map(f => {
        return (
            <div key={f.id}>
                <img
                    src={'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'}/>
                <NavLink to={`/friends/${f.id}`}
                         activeClassName={s.activeLink}>{f.name}</NavLink>
            </div>
        )
    })
    return (
        <div className={s.friend}>
            <h2>Friends</h2>
            {friendsElement}
        </div>
    )
}