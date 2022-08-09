import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route,Redirect} from 'react-router-dom';
import  reducer from './store/loginstore'
import { Provider } from 'react-redux'
import { createStore } from 'redux';

const Store = createStore(reducer);
ReactDOM.render(
  
  <BrowserRouter>
  <Provider store={Store}>
    <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
