import {Component} from 'react';

//리덕스에 종속되지 않는 프레젠테이션 컴포넌트
export default class AddNumber extends Component{
    state ={
        size: 1
    }

    render(){
      return(
        <div>
          <h1>Add Number</h1>
          <input type="button" value="+" onClick={function(e){
              this.props.onClick(this.state.size);
              //store.dispatch({type:"INCREMENT", size:this.state.size}); //리덕스 스토어에 종속된 기능(부품으로서 사용불가)
          }.bind(this)
          }></input>
          <input type="text" value={this.state.size} onChange={function(e){
              this.setState({
                  size:Number(e.target.value)
              })
          }.bind(this)
          }></input>
        </div>
      )
    }
  }