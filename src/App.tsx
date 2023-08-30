import React, {lazy, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, RouteComponentProps, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";

const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"))

export type MapAppPropsType = MapStateToPropsType & MapDispatchToProps & RouteComponentProps
type MapDispatchToProps = {
    initializedApp: () => any
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
                <div className={'app-wrapper'}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route exact path='/' render={() => <ProfileContainer/>}/>
                                {this.props.initialized && <Route exact path='/samurai-way-main' render={() => <ProfileContainer/>}/>}
                                <Route exact path='/Dialogs' render={() => <DialogsContainer/>}/>
                                <Route exact path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route exact path='/Users' render={() => <UsersContainer/>}/>
                                <Route exact path='/Login' component={Login}/>
                                <Route exact path='/News' component={News}/>
                                <Route exact path='/Music' component={Music}/>
                                <Route exact path='/Settings' component={Settings}/>
                                <Route exact path='/*' render={() => <h1>404 PAGE NOT FOUND</h1>}/>
                            </Switch>
                        </Suspense>
                    </div>
                </div>
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


