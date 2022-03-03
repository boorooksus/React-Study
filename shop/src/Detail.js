import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// styled-components
let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  // $: 백틱 기호 안에서 쓸 수 있는 자바스크립트 문법
  // props를 받아와서 이중에 props.색상을 반환
  color : ${ props => props.색상 }
`;

function Detail(props){
    const navigate = useNavigate();
    let { id } = useParams();
    let product = props.shoes.find((p) => {return p.id == id})

    return (
      <div className="container">
        <박스>
          <제목 색상={'lightSkyBlue'}>상세페이지</제목>
        </박스>
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + (Number(id) + 1) + ".jpg"} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{product.title}</h4>
            <p>{product.content}</p>
            <p>{product.price}원</p>
            <button className="btn btn-danger">주문하기</button> 
            <button className="btn btn-warning" onClick={() => {navigate(-1)}}>뒤로가기</button> 
          </div>
        </div>
  </div> 
    )
  }

  export default Detail;