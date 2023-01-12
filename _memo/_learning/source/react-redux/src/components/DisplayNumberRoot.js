import {Component} from 'react';
//import DisplayNumber from '../components/DisplayNumber';
import DisplayNumber from '../containers/DisplayNumber';

export default class DisplayNumberRoot extends Component{
    // redux 도입전 <DisplayNumber number={this.props.number}></DisplayNumber>
    render(){
      return(
        <div>
          <h1>DisplayNumber Root</h1>
          <DisplayNumber></DisplayNumber>
        </div>
      )
    }
  }