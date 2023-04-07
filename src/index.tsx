import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as querystring from "querystring";
import state, {addPost} from "./redux/state";
import {rerenderIntireTree} from "./render";

rerenderIntireTree(state)