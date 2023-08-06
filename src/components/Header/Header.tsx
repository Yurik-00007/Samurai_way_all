import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderConteiner";

export const Header = (props: HeaderPropsType) => {
    const onClickHandler = () => {
        props.logout()
    }
    return <header className={s.header}>
        <img alt={'pic'}
             src={'https://avatars.mds.yandex.net/i?id=59aefb66080318221dc1ad0411b31e4f869927eb-8210406-images-thumbs&n=13'}/>
        <div className={s.loginBlock}>
            {
                props.isAuth
                    ? <div>
                        {props.login}-
                        <button onClick={onClickHandler}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                // <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>

}