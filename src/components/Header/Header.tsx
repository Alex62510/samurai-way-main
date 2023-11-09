import React from "react";
import s from './Header.module.css'
import {Link, NavLink} from "react-router-dom";
import {MapAuthType} from "./HeaderContainer";
import {Avatar, Col, Layout, Menu, MenuProps, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const items1: MenuProps['items'] = ['1'].map(key => ({
    key,
    label: <Link to='/Developers'>Developers</Link>,
}));

export type HeaderPropsType=MapAuthType
function Header(props:HeaderPropsType) {
    const {Header} = Layout;

    const login=useSelector((state:AppStateType)=>state.auth.login)
    const isAuth=useSelector((state:AppStateType) => state.auth.isAuth)

    return(
        <Header className="header">

            <div className="logo"/>
            <Row>
                <Col span={23}>
                    <Menu theme="dark" mode="horizontal" items={items1}/>
                </Col>
                <Col span={1}>
                    <Avatar icon={<UserOutlined/>}/>
                </Col>
            </Row>
        </Header>
        // <header className={s.header}>
        //     <img
        //         src="https://www.adobe.com/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"/>
        //     <div className={s.loginBlock}>
        //         {props.isAuth
        //             ? <div>{props.login}-<button onClick={props.logout}>logout</button></div>
        //             : <NavLink to={'/Login'}>Login</NavLink>}
        //     </div>
        // </header>
    )
}
export default Header;