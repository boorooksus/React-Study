/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState('삼겹살');
  // 자바스크립트 신문법 - destructuring
  // '글제목'에는 값(삽겹살)이, '글제목변경'에는 '글제목' 값을 변경하는 함수가 들어감
  let [글제목2, 글제목변경2] = useState(['갈비', '우동']);
  let [따봉, 따봉변경] = useState(0);
  let [idx, setIdx] = useState(0);
  let menu = ['밥', '빵']

  function 제목바꾸기(){
    setIdx((idx + 1) % 2)
  }

  function 제목바꾸기2(){
    var newArray = [...글제목2];
    newArray[0] = '햄버거'
    글제목변경2(newArray)
  }

  return (
    // return 안에는 하나의 div 태그만 올 수 있음. 
    // div 안에 div 여러개 넣는 것은 가능
    <div className="App">
      <div className="black-nav">
        개발 Blog
      </div>
      <div className="list">
        <h3>{ 글제목 } <span onClick={() => {따봉변경(따봉 + 1)}}>😉</span>{따봉}</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목 }<span onClick={제목바꾸기}>😉</span>{menu[idx]}</h3>
        <p>2월 18일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목2[1] }<span onClick={제목바꾸기2}>😉</span>{글제목2}</h3>
        <p>2월 18일 발행</p>
        <hr/>
      </div>

      <Modal></Modal>
      <Modal />
    </div>
  );
}

// React Component
// 이름은 관습적으로 대문자로 시작
// 선언 위치는 'function App()'과 나란히
function Modal(){
  // return은 태그만 가능
  return (
    // fragment 문법 (div 대신 사용)
    <>
      <div>
        <div className="modal">
          <h2>제목</h2>
          <p>날짜</p>
          <p>상세 내용</p>
        </div>
      </div>
    </>
  )
}

export default App;
