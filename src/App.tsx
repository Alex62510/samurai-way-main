import React, {lazy, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, NavLink, Route, RouteComponentProps, Switch, useHistory} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import s from "./components/Navbar/Navbar.module.css";
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"))

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items2: MenuItem[] = [
    getItem(<NavLink to='/Profile' >Profile page</NavLink>, '1',<UserOutlined /> ),
    getItem(<NavLink to='/Dialogs' >Messages</NavLink>, '2', <FileOutlined />),
    getItem(<NavLink to='/Users' >Developers</NavLink>, '3', <TeamOutlined />),
    getItem('User', 'sub1', <DesktopOutlined />, [
        getItem('Tom', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <DesktopOutlined />),
];
export type MapAppPropsType = MapStateToPropsType & MapDispatchToProps & RouteComponentProps
type MapDispatchToProps = {
    initializedApp: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}

const navigateLink = (label:string) => {
    <NavLink to={`/${label}`} activeClassName={s.activeLink}>label</NavLink>
}



class App extends React.Component<MapAppPropsType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                    items={items2}
                                    // onClick={navigateLink(items2.map(t=>t))}
                                />
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Suspense fallback={<Preloader/>}>
                                                <Switch>
                                                    <Route exact path='/' render={() => <ProfileContainer/>}/>
                                                    {this.props.initialized && <Route exact path='/samurai-way-main' render={() => <ProfileContainer/>}/>}
                                                    <Route exact path='/Dialogs' render={() => <DialogsContainer/>}/>
                                                    <Route exact path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                                    <Route exact path='/Users' render={() => <UsersPage pageTitle='Users'/>}/>
                                                    <Route exact path='/Login' component={LoginPage}/>
                                                    <Route exact path='/News' component={News}/>
                                                    <Route exact path='/Music' component={Music}/>
                                                    <Route exact path='/Settings' component={Settings}/>
                                                    <Route exact path='/*' render={() => <h1>404 PAGE NOT FOUND</h1>}/>
                                                </Switch>
                                            </Suspense>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                {/*<div className={'app-wrapper'}>*/}
                {/*    <HeaderContainer/>*/}
                {/*    <Navbar/>*/}
                {/*    <div className='app-wrapper-content'>*/}
                {/*        <Suspense fallback={<Preloader/>}>*/}
                {/*            <Switch>*/}
                {/*                <Route exact path='/' render={() => <ProfileContainer/>}/>*/}
                {/*                {this.props.initialized && <Route exact path='/samurai-way-main' render={() => <ProfileContainer/>}/>}*/}
                {/*                <Route exact path='/Dialogs' render={() => <DialogsContainer/>}/>*/}
                {/*                <Route exact path='/Profile/:userId?' render={() => <ProfileContainer/>}/>*/}
                {/*                <Route exact path='/Users' render={() => <UsersPage pageTitle='Users'/>}/>*/}
                {/*                <Route exact path='/Login' component={LoginPage}/>*/}
                {/*                <Route exact path='/News' component={News}/>*/}
                {/*                <Route exact path='/Music' component={Music}/>*/}
                {/*                <Route exact path='/Settings' component={Settings}/>*/}
                {/*                <Route exact path='/*' render={() => <h1>404 PAGE NOT FOUND</h1>}/>*/}
                {/*            </Switch>*/}
                {/*        </Suspense>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </BrowserRouter>
        )
    }
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializedApp}))(App)


