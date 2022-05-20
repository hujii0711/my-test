// 액션 타입 정의하기
const INCREASE = 'counter/INCREASE'; // '모듈이름/액션이름' 모듈 이름을 넣음으로서 액션의 이름이 충돌되지 않게 해줌
const DECREASE = 'counter/DECREASE';

// 액션 타입을 정의한 다음에는 액션 생성 함수를 만들어 주어야 한다.
export const increase = () => ({ type : INCREASE });
export const decrease = () => ({ type : DECREASE });

const initialState = {
  number: 0
};

function counter(state = initialState, action){
  switch(action.type){
    case INCREASE : 
      return {
        number: state.number + 1
      };
    case DECREASE : 
      return {
        number: state.number - 1
      };
    default :
      return state;
  }
};

export default counter; //리듀서가 해당 컴포넌트의 메인 역할이라는 것을 보여움
