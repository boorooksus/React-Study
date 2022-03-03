import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Container, NavDropdown, Nav, Card, Button} from 'react-bootstrap';
import Data from './data.js';
import { Link, Routes, Route } from 'react-router-dom';

// 부트스트랩 사용하기: npm으로 부트스트랩 설치(react-bootstrap 용도)
// public/index.html에 링크 태그 import (그냥 부트스트랩 용도)
function App() {

  let [shoes, setShoes] = useState(Data);


  return (
    <div className="App">
      <MyNavbar />

      <Routes>
        <Route exact path="/" element={<div><Card className="background">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        </Card.Body>
       </Card><Products shoes={shoes} /></div>} />

        <Route exact path="/detail/*" element = {<Detail />}/>
      </Routes>
    </div>
  );
}

function Detail(){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
</div> 
  )
}

function Products(props){

  const products = props.shoes;
  const productList = products.map((product, i) => {return <div className="col-md-4" key={i}><a href="/detail"><img src={"https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"} width="100%"></img><h4>{product.title}</h4><p>{product.content}</p></a></div>});

  // let productList = new Array()
  // for (var i = 0; i < products.length; i++){
  //   productList[i] = <div className="col-md-4" key={i}><img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"></img><h4>{props.shoes[i].title}</h4><p>{props.shoes[i].content}</p></div>
  // }

  const outside = <div className="container"><div className="row">{productList}</div></div>

  return (
    outside
  )
}

function MyNavbar(){
  return (
    <div>
      <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">This is Title</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
  )
}

export default App;
