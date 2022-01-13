import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import store from './store/store'
import { Provider } from 'react-redux'



import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Router from './Router'
import axios from 'axios';
import {linkAPI,SUCCESS,FAIL} from './config'
axios.defaults.baseURL = linkAPI;


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <App /> */}
      <Router/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
