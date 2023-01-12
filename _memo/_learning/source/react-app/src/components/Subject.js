import React, { Component } from 'react'; 

// class 이름은 대문자로 시작해야한다.
class Subject extends Component{
  render(){ //class안에 있는 함수는 function을 생략한다.
    // return 안에는 최소 하나의 최상위 태그가 존재해야한다. 여기서는 <header>
    return(
      <header>
        <h1>
          <a 
            href="/" 
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.desc}
      </header>
    );
  }
}

export default Subject;