import DisplayNumber from '../components/DisplayNumber';
import {connect} from 'react-redux';

//subscribe --> setState 작업과 동일
//mapReduxState : store.getState().number
//store의 state값이 바뀔때마다 호출됨
function mapReduxStateToReactProps(state){//store의 state의 값을 인자로 전달
    return {
        number : state.number
    }
    //<DisplayNumber number></DisplayNumber>
    //number : <DisplayNumber number={this.state.number}></DisplayNumber> 와 같음
}

function mapReduxDispatchToReactProps(){
    return {}
}

//connect()실행시 함수리턴 그것을 다시 호출
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(DisplayNumber); //wrapping된 컴포넌트 리턴하여 export

// class extends Component{
//     state = {
//         number : store.getState().number
//     }

//     constructor(props){
//         super(props);
//         store.subscribe(function(){
//             this.setState({number: store.getState().number})
//         }.bind(this));
//     }
//     render(){
//         return <DisplayNumber number={this.state.number}></DisplayNumber>
//     }
// }


