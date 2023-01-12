import {Component} from 'react';
//import store from '../store';

export default class DisplayNumber extends Component{
    //state = {
    //    number : store.getState().number
    //}
    //state값이 바뀌었다고해서 render() 실행될 근거가 없다.
    //store의 값이 변경되었다는 사실을 통보를 받아야 한다.
    //constructor(props){
    //    super(props);
        //store의 값이 바뀌었을때 subscribe 호출됨
    //    store.subscribe(function(){
    //        this.setState({number: store.getState().number})
    //    }.bind(this));
    //}
    render(){
      return(
        <div>
          <h1>DisplayNumber</h1>
          <input type="text" value={this.props.number} readOnly></input>
        </div>
      )
    }
  }