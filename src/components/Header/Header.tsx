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
             src={'https://media.istockphoto.com/vectors/adoption-and-community-care-vector-id1286680331?k=20&m=1286680331&s=612x612&w=0&h=N7cQExSqTTo-Jd30iyOe0IrCCpbeyCRBuxUHL1j13qs='}/>
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