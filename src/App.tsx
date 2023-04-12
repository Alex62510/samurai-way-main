import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {NewPostTextType, StateType} from "./redux/state";

export type AppPropsType={
    state:StateType
    addPost:()=>void
    newPostText:NewPostTextType
    updatedNewPostText:(newText:string)=>void
}
    function App (props:AppPropsType)  {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs
                        dialogs={props.state.messagePage.dialogs}
                        messages={props.state.messagePage.messages}/>}/>
                    <Route path='/profile' render={() => <Profile
                        updatedNewPostText={props.updatedNewPostText}
                        posts={props.state.profilePage.posts}
                        addPost={props.addPost}
                        newPostText={props.newPostText}/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App

