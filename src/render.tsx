import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as querystring from "querystring";
import {addPost, StateType, updatedNewPostText} from "./redux/state";


export const rerenderIntireTree=(state:StateType)=>{
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
            newPostText={state.profilePage.newPostText}
            updatedNewPostText={updatedNewPostText}
        />,
        document.getElementById('root')
    );
}
