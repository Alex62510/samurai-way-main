import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, RouteComponentProps, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import {DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';
import {Header} from "./components/Header/Header";

const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"))

const {Content, Footer, Sider} = Layout;

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
    getItem(<Link to='/Profile'>Profile page</Link>, '1', <UserOutlined/>),
    getItem(<Link to='/Dialogs'>Messages</Link>, '2', <FileOutlined/>),
    getItem(<Link to='/Developers'>Developers</Link>, '3', <TeamOutlined/>),
    getItem('User', 'sub1', <DesktopOutlined/>, [
        getItem('Tom', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <DesktopOutlined/>),
];
export type MapAppPropsType = MapStateToPropsType & MapDispatchToProps & RouteComponentProps
type MapDispatchToProps = {
    initializedApp: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}

class App extends React.Component<MapAppPropsType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header/>
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}
                                    items={items2}
                                />
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                <Suspense fallback={<Preloader/>}>
                                    <Switch>
                                        <Route exact path='/' render={() => <ProfileContainer/>}/>
                                        {this.props.initialized &&
                                            <Route exact path='/samurai-way-main' render={() => <ProfileContainer/>}/>}
                                        <Route exact path='/Dialogs' render={() => <DialogsContainer/>}/>
                                        <Route exact path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                        <Route exact path='/Developers' render={() => <UsersPage pageTitle='Users'/>}/>
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
                    <Footer style={{textAlign: 'center'}}>Social network 2023 created by Alex Orlov</Footer>
                </Layout>
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


