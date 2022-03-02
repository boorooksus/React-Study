/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState('삼겹살');
  // 자바스크립트 신문법 - destructuring
  // '글제목'에는 값(삽겹살)이, '글제목변경'에는 '글제목' 값을 변경하는 함수가 들어감
  let [글제목2, 글제목변경2] = useState(['갈비', '우동', '피자']);
  let [따봉, 따봉변경] = useState(0);
  let [idx, setIdx] = useState(0);
  let menu = ['밥', '빵']
  let [modal, modal변경] = useState(false);
  let [num, setNum] = useState(0)

  function 제목바꾸기(){
    setIdx((idx + 1) % 2)
  }

  function 제목바꾸기2(){
    var newArray = [...글제목2];
    newArray[0] = '햄버거'
    글제목변경2(newArray)
  }

  // map() 함수에 대한 설명
  var array = [1, 2, 3];
  var newArray = array.map((a) => { return a * 2});
  console.log(newArray);

  // map 말고 다른 방식으로 반복문 사용하기
  function 반복된ui(){
    var arr = [];
    for (var i = 0; i < 3; i++){
      arr.push(<div>안녕</div>)
    }
    return arr
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
      

      {
        글제목2.map((원소) => {
          return (
            <div className="list" onClick={() => { modal변경(!modal)}}>
            <h3>{ 원소 }<span onClick={제목바꾸기2}>😉</span></h3>
            <p>2월 18일 발행</p>
            <hr/>
          </div>
          )
        })}

        <button onClick={() => { setNum(0) }}>버튼1</button>
        <button onClick={() => {setNum(1) }}>버튼2</button>
        <button onClick={() => { setNum(2) }}>버튼3</button>
        <Modal 글제목2={글제목2} num={num}/>

      {
        // 중괄호 안에는 변수, 함수명만 올 수 있음 -> 조건 넣으려면 삼항연산자 사용
        modal === true
        ? <Modal 글제목2={글제목2} 텍스트="텍스트" num={num}></Modal>
        : null
        // 아무것도 안보이고 싶을 때는 null 사용
      }
    </div>
  );
}

// React Component
// 이름은 관습적으로 대문자로 시작
// 선언 위치는 'function App()'과 나란히
function Modal(props){
  // return은 태그만 가능
  return (
    // fragment 문법 (div 대신 사용)
    <>
      <div>
        <div className="modal">
          <h2> { props.글제목2 ?  props.글제목2[props.num] : null}</h2>
          <p>날짜</p>
          <p>{props.텍스트}</p>
        </div>
      </div>
    </>
  )
}

export default App;
