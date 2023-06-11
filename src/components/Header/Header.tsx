import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {mapStateToProps} from "./HeaderContainer";

type HeaderPropsType=mapStateToProps

function Header(props:HeaderPropsType) {
    return(
        <header className={s.header}>
            <img
                src="https://www.adobe.com/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>
    )
}
export default Header;