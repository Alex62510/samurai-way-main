import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, StateType, subscraber, updatedNewPostText} from "./redux/state";


const rerenderIntireTree=(state:StateType)=>{
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
subscraber(rerenderIntireTree)
rerenderIntireTree(state)