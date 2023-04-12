import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {StateType} from "./redux/state";


const rerenderIntireTree=(state:StateType)=>{
    ReactDOM.render(
        <App
            state={state}
            dispatch={store.dispatch.bind(store)}
            newPostText={store._state.profilePage.newPostText}
        />,
        document.getElementById('root')
    );
}
rerenderIntireTree(store.getState())
store.subscraber(rerenderIntireTree)