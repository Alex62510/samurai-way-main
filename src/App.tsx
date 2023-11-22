import React, {FC, lazy, Suspense, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {useSelector} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType, useAppDispatch} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import {Breadcrumb, Layout} from 'antd';
import {Header} from "./components/Header/Header";
import Sidebar from "./components/Sidebar/sidebar";


const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"))
const ChatPage = lazy(() => import("./pages/chat/chatPage"))

const {Content, Footer} = Layout;

const App: FC = () => {

    const initialized = useSelector((state: AppStateType) => state.app.initialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedApp())
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sidebar/>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Route exact path='/' render={() => <ProfileContainer/>}/>
                                    {initialized &&
                                        <Route exact path='/samurai-way-main' render={() => <ProfileContainer/>}/>}
                                    <Route exact path='/Dialogs' render={() => <DialogsContainer/>}/>
                                    <Route exact path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route exact path='/Developers' render={() => <UsersPage pageTitle='Users'/>}/>
                                    <Route exact path='/Login' component={LoginPage}/>
                                    <Route exact path='/Chat' component={ChatPage}/>
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
export default App

