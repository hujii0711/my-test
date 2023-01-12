import {Component} from 'react';
import AddNumber from '../components/AddNumber'; //wrapping할 컴포넌트 import
import store from '../store';

// 리덕스 스토어에 종속된 컨테이너 컴포넌트
//export default class AddNumber extends Component{ class 뒤에 AddNumber 제거
export default class extends Component{
  render(){
    return <AddNumber onClick={function(_size){
      store.dispatch({type:"INCREMENT", size:_size}); //원래 AddNumber컴포넌트에서 기능을 가져옴
    }.bind(this)}></AddNumber>
  }
}