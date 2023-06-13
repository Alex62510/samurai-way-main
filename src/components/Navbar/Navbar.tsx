import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/Profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/Dialogs' activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/Users' activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/News' activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Music' activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Settings' activeClassName={s.activeLink}>Settings</NavLink>
            </div>
            <div className={s.friends}>
                <div>Alex</div>
                <div>Mary</div>
                <div>Andrew</div>
            </div>
        </nav>)
}
export default Navbar
