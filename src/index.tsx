import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateType} from "./redux/store";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";


const rerenderIntireTree = (state: StateType) => {
    ReactDOM.render(
        <Provider store={store}>
            <App store={store}/>
        </Provider>,
        document.getElementById('root')
    );
}
rerenderIntireTree(store.getState())
store.subscribe(() => {
    let state = store.getState()
    rerenderIntireTree(state)
})