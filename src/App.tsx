import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, RouteComponentProps} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";


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
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className={'app-wrapper'}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/Users' render={() => <UsersContainer/>}/>
                        <Route path='/Login' component={Login}/>
                        <Route path='/News' component={News}/>
                        <Route path='/Music' component={Music}/>
                        <Route path='/Settings' component={Settings}/>
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


