import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route } from "react-router-dom";

// 라우팅 사용하기 위해 import
// HashRouter는 BrowserRouter와 비슷하지만 주소창에 '#' 이 붙음
// 서버 사용하지 않을 때 이용하면 안전함
import { BrowserRouter, HashRouter } from "react-router-dom";

// 리덕스 세팅
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

let 기본값 = [
  { id: 0, name: "신발", quan: 2 },
  { id: 1, name: "모자", quan: 20 },
  { id: 2, name: "가방", quan: 0 },
];

function reducer(state = 기본값, 액션) {
  console.log(액션.payload);
  if (액션.type === "항목추가") {
    let copy = [...state];
    let idx = copy.findIndex((a) => {
      return a.id === 액션.payload.id;
    });
    console.log(idx);
    if (idx >= 0) {
      copy[idx].quan++;
    } else {
      copy.push(액션.payload);
    }
    return copy;
  } else if (액션.type === "수량증가") {
    let copy = [...기본값];
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...기본값];
    copy[액션.payload].quan--;
    return copy;
  } else {
    return state;
  }
}

function reducer2(state = true, 액션) {
  if (액션.type === "닫기") {
    state = false;
    return state;
  }
  return state;
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    {/* 라우팅 기능 사용하려면 '<App />' 을 <BrowserRouter>로 감싸야함*/}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
