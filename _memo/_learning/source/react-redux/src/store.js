import {createStore} from 'redux';

//createStore(func): func는 리듀서함수
export default createStore(function(state, action){
    //state: 데이터
    //action: 그 데이터에 가해지는 행위

    // state 정의되지 않으면 (최초의 실행)
    if(state === undefined){
        return {number:0}
    }

    if(action.type === "INCREMENT"){
        return {...state, number:state.number + action.size} //state를 복제하고 복제된 state에서 추가된 값 변형
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //두번째인자는 devtool 사용위한 코드
)