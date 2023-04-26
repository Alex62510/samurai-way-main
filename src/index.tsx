import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  {StateType} from "./redux/store";
import {store} from "./redux/redux-store";


const rerenderIntireTree=(state:StateType)=>{
    ReactDOM.render(
        <App
            state={state}
            dispatch={store.dispatch.bind(store)}
            newPostText={store.getState().profilePage.newPostText}
        />,
        document.getElementById('root')
    );
}
rerenderIntireTree(store.getState())
store.subscribe(()=>{
    let state=store.getState()
    rerenderIntireTree(state)
})