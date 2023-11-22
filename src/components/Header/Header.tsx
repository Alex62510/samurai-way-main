import React from "react";
import {Link} from "react-router-dom";

import {Avatar, Button, Col, Layout, Menu, MenuProps, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

const items1: MenuProps['items'] = ['1'].map(key => ({
    key,
    label: <Link to='/Developers'>Developers</Link>,
}));


export const Header = () => {
    const {Header} = Layout;

    const login = useSelector((state: AppStateType) => state.auth.login)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">

            <div className="logo"/>
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" items={items1}/>
                </Col>

                    {isAuth
                        ? <><Col span={2}>
                            <Avatar alt={login || ''} icon={<UserOutlined/>}/>
                        </Col>
                            <Col span={2}>
                                <Button onClick={handleLogout}>log out</Button>
                            </Col>
                        </>
                        : <Col span={3}>
                            <Button>
                                <Link to={'/Login'}>Login</Link>
                            </Button>
                        </Col>}
            </Row>
        </Header>
        // <header className={s.header}>
        //     <img
        //         src="https://www.adobe.com/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"/>

        // </header>
    )
}

