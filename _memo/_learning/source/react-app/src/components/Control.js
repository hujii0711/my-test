import React, { Component } from 'react'; 

// class 이름은 대문자로 시작해야한다.
class Control extends Component{
  render(){ //class안에 있는 함수는 function을 생략한다.
    // return 안에는 최소 하나의 최상위 태그가 존재해야한다. 여기서는 <header>
    return(
        <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode("create");
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode("update");
          }.bind(this)}>update</a></li>
          <li><input type="button" value="delete" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode("delete");
          }.bind(this)}></input></li>
        </ul>
    );
  }
}

export default Control;