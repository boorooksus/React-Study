import React from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {
  // 훅 이용해서 redux의 state 가져오기
  let state = useSelector((state) => state.reducer);
  // 훅 이용해서 dispatch
  let dispatch = useDispatch();

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.map((product, i) => {
            return (
              <tr key={i}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량증가", payload: { name: "kim" } });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소" });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alertState ? (
        <div className="my-alert2">
          <p>신규 할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

// // 리덕스 'store' state 의 데이터를 가져와서 props로 만들어주는 함수
// function 함수명(state) {
//   return {
//     state: state.reducer,
//     alertState: state.reducer2,
//   };
// }

// export default connect(함수명)(Cart);

export default Cart;
