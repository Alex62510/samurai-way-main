import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {MapAuthType} from "./HeaderContainer";


export type HeaderPropsType=MapAuthType
function Header(props:HeaderPropsType) {
    return(
        <header className={s.header}>
            <img
                src="https://www.adobe.com/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}-<button onClick={props.logout}>logout</button></div>
                    : <NavLink to={'/Login'}>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header;