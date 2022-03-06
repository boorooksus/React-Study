import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { StockContext } from "./App.js";
import { Navbar, Item, Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

// styled-components
let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  // $: 백틱 기호 안에서 쓸 수 있는 자바스크립트 문법
  // props를 받아와서 이중에 props.색상을 반환
  color: ${(props) => props.색상};
`;

function Detail(props) {
  const navigate = useNavigate();
  let { id } = useParams();
  let product = props.shoes.find((p) => {
    return p.id == id;
  });
  let [visibility, setVisibility] = useState("visible");
  let [alertStatus, setAlertStatus] = useState(true);
  let [inputData, setInputData] = useState("");
  let [tabStatus, setTabStatus] = useState(0);
  let [switchStatus, setSwitchStatus] = useState(false);

  // 컴포넌트 생성 시 실행할 것
  useEffect(() => {
    console.log("exec useEffect");

    // 2초 후에 alert 창 제거
    let 타이머 = setTimeout(() => {
      setVisibility("hidden");
      setAlertStatus(false);
    }, 2000);

    // Detail 사라지면 타이머 종료 시켜야 버그 안생김
    return () => {
      clearTimeout(타이머);
    };
  });

  // 컴포넌트 종료할 때 실행할 것은 return 안에 넣음
  // 그런데 그냥 이렇게 쓰면 state가 변경될 때에도 return 실행됨.
  useEffect(() => {
    return () => {
      console.log("Detail component is closed or state is changed");
      // alert('bye');
    };
  });

  // 실행 조건 넣으려면 하려면 아래처럼
  useEffect(() => {
    // alertStatus가 변경될 때에만 수행됨
    console.log("alertStatus is changed");
  }, [alertStatus]);

  // 대괄호 비우면 어떤 state가 변경 되어도 수행 한됨
  // Detail 페이지 켜지면 한 번 실행하고 끝남
  useEffect(() => {
    // alertStatus가 변경될 때에만 수행됨
    console.log("run once");
  }, []);

  return (
    <div className="container">
      <박스>
        {/* 여기 props 전달은 큰따옴표, 중괄호 둘 다 가능 */}
        <제목 색상="lightSkyBlue">상세페이지</제목>
        <제목 className="red">상세페이지</제목>
      </박스>
      <input
        onChange={(e) => {
          setInputData(e.target.value);
        }}
      />
      <div className="my-alert" style={{ visibility: visibility }}>
        <p>재고 임박</p>
      </div>
      {alertStatus ? (
        <div className="my-alert2">
          <p>재고 임박2</p>
        </div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(id) + 1) + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>
          <Stock id={id}></Stock>
          <button
            className="btn btn-danger"
            onClick={() => {
              let arr = [...props.stock];
              arr[id] -= 1;
              props.setStock(arr);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setSwitchStatus(false);
              setTabStatus(0);
            }}
          >
            Option 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setSwitchStatus(false);
              setTabStatus(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setSwitchStatus(false);
              setTabStatus(2);
            }}
          >
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={switchStatus} classNames="wow" timeout={500}>
        <TabContent tabStatus={tabStatus} setSwitchStatus={setSwitchStatus} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setSwitchStatus(true);
  });

  if (props.tabStatus === 0) {
    return <dvi>1 번째 내용</dvi>;
  } else if (props.tabStatus === 1) {
    return <div>2 번째 내용</div>;
  } else if (props.tabStatus === 2) {
    return <div>3 번째 내용</div>;
  }
}

function Stock(props) {
  let stocks = useContext(StockContext);

  return <p>재고: {stocks[props.id]}</p>;
}

export default Detail;
