import React, { useState, useContext, lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar, Container, NavDropdown, Nav, Card, Button } from "react-bootstrap";
import Data from "./data.js";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
// import Detail from "./Detail";
let Detail = lazy(() => {
  return import("./Detail.js");
});

// 같은 값 공유하는 범위 생성
// 다른 파일에서도 공유하려면 앞에 export 붙이기
export let StockContext = React.createContext();

// 부트스트랩 사용하기: npm으로 부트스트랩 설치(react-bootstrap 용도)
// public/index.html에 링크 태그 import (그냥 부트스트랩 용도)
function App() {
  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);

  return (
    <div className="App">
      <MyNavbar />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              {/* 공유할 context 범위 감싸기 */}
              <StockContext.Provider value={stock}>
                <ProductList shoes={shoes} setShoes={setShoes} />
              </StockContext.Provider>
            </div>
          }
        />

        <Route
          exact
          path="/detail/:id"
          element={
            <div>
              <StockContext.Provider value={stock}>
                <Suspense fallback={<div>로딩중</div>}>
                  <Detail shoes={shoes} stock={stock} setStock={setStock} />
                </Suspense>
              </StockContext.Provider>
            </div>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function ProductList(props) {
  return (
    <div>
      <Card className="background">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Products shoes={props.shoes} />

      <button
        className="btn btn-primary"
        onClick={(e) => {
          axios.post("서버URL", { id: 123, pw: 123 });

          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((res) => {
              console.log("Ajax Success");

              console.log(res.data[0]);

              let arr = [...props.shoes];

              // 아래 map과 같은 결과 코드
              props.setShoes([...props.shoes, ...res.data]);
              // res.data.map((product, i) => {arr.push(product)})
            })
            .catch(() => {
              console.log("Ajax Failed");
            });
        }}
      >
        더보기
      </button>

      <Recent />
    </div>
  );
}

function Recent() {
  var recentItems = JSON.parse(localStorage.getItem("recent"));
  let outside = <div>hi</div>;

  if (recentItems) {
    console.log("recent: ", recentItems);
    const productList = recentItems.map((id, i) => {
      return (
        <div className="col-md-4" key={i}>
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(id) + 1) + ".jpg"} width="50%"></img>
        </div>
      );
    });

    outside = (
      <div className="container">
        최근 본 상품
        <div className="row">{productList}</div>
      </div>
    );
  }

  return outside;
}

function Products(props) {
  // 공유된 context 불러오기
  let stocks = useContext(StockContext);

  const products = props.shoes;
  const productList = products.map((product, i) => {
    return (
      <div className="col-md-4" key={i}>
        <Link to={"/detail/" + i}>
          <img src={"https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"} width="100%"></img>
          <h4>{product.title}</h4>
          <p>{product.content}</p>
          {stocks[i]}
        </Link>
      </div>
    );
  });

  // let productList = new Array()
  // for (var i = 0; i < products.length; i++){
  //   productList[i] = <div className="col-md-4" key={i}><img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"></img><h4>{props.shoes[i].title}</h4><p>{props.shoes[i].content}</p></div>
  // }

  const outside = (
    <div className="container">
      <div className="row">{productList}</div>
    </div>
  );

  return outside;
}

function MyNavbar() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">This is Title</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav>
                <Link to="/detail">Detil</Link>
              </Nav>
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
  );
}

export default App;
