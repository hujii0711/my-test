import {Component} from 'react';
//import AddNumber from '../components/AddNumber';
import AddNumber from '../containers/AddNumber'; //바꿔치기

export default class AddNumberRoot extends Component{
    // redux 도입전 
    //<AddNumber onClick={function(size){
    //    this.props.onClick(size);
    //}.bind(this)}></AddNumber>
  render(){
    return(
      <div>
        <h1>Add Number Root</h1>
        <AddNumber></AddNumber>
      </div>
    )
  }
}