import DisplayNumber from '../components/DisplayNumber';
import {Component} from 'react';
import store from '../store';

//export default class DisplayNumber extends Component{ class 뒤에 DisplayNumber 제거
export default class extends Component{
    state = {
        number : store.getState().number
    }

    constructor(props){
        super(props);
        store.subscribe(function(){
            this.setState({number: store.getState().number})
        }.bind(this));
    }
    render(){
        return <DisplayNumber number={this.state.number}></DisplayNumber>
    }
}