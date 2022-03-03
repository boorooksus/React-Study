import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route,
} from "react-router-dom";

// 라우팅 사용하기 위해 import
// HashRouter는 BrowserRouter와 비슷하지만 주소창에 '#' 이 붙음
// 서버 사용하지 않을 때 이용하면 안전함
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
     {/* 라우팅 기능 사용하려면 '<App />' 을 <BrowserRouter>로 감싸야함*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
