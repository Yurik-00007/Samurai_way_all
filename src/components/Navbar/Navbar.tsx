import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

type NavbarType = {}

export const Navbar = (props: NavbarType) => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={'/profile'} activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        {/*
        <div className={s.item}><a href={'/profile'}>Profile</a></div>
*/}
        <div className={s.item}>
            <NavLink to={'/dialogs'} activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/users'} activeClassName={s.activeLink}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/photos'} activeClassName={s.activeLink}>Photos</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/music'} activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/settings'} activeClassName={s.activeLink}>Settings</NavLink>
        </div>

{/*
        <div className={s.item}>
            <Friends/></div>
*/}
    </nav>
}
