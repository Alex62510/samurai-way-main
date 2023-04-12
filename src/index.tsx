import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {StateType} from "./redux/state";


const rerenderIntireTree=(state:StateType)=>{
    ReactDOM.render(
        <App
            state={state}
            addPost={store.addPost.bind(store)}
            newPostText={store._state.profilePage.newPostText}
            updatedNewPostText={store.updatedNewPostText.bind(store)}
        />,
        document.getElementById('root')
    );
}
rerenderIntireTree(store.getState())
store.subscraber(rerenderIntireTree)