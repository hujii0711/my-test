import { createAction, handleActions } from "redux-actions";
// Duck 패턴 : 액션타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나로 몰아서 다 작성하는 방식

// 액션 타입 정의하기
const INCREASE = "counter/INCREASE"; // '모듈이름/액션이름' 모듈 이름을 넣음으로서 액션의 이름이 충돌되지 않게 해줌
const DECREASE = "counter/DECREASE";

// 액션 타입을 정의한 다음에는 액션 생성 함수를 만들어 주어야 한다.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

//createAction으로 만든 액션 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용하기 때문에
//action.id, action.todo를 조회하는 대신, 모두 공통적으로 action.payload 값을 조회하도록 handleAction 내부의 리듀서를 구현해주어야 한다.
const counter = handleActions(
  //액션에 따라 실행 할 함수들을 가지고있는 객체
  {
    [INCREASE]: function (state, action) {
      //console.log("handleActions >>> state=====", state);   //{number: 0}
      //console.log("handleActions >>> action=====", action); //{type: 'counter/INCREASE'}
      return { number: state.number + 1 };
    },
    [DECREASE]: function (state, action) {
      return { number: state.number - 1 };
    },
  },
  initialState
);

export default counter; //리듀서가 해당 컴포넌트의 메인 역할이라는 것을 보여움
