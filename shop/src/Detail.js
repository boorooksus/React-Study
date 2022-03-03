import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Detail(props){
    const navigate = useNavigate();
    let { id } = useParams();
    let product = props.shoes.find((p) => {return p.id == id})

    console.log(id);

    return (
      <div className="container">
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