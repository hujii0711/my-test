import React, { Component } from 'react'; 

class UpdateContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      id : this.props.data.id,
      title: this.props.data.title,
      desc : this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e){
    this.setState({
      [e.target.name] : e.target.value //[e.target.name] 최신문법 []가 최신
    });
  }

  render(){
    console.log(this.props.data);
    //input태그 내부에 속성값에 this.props.data.title에서 바인딩되지 않음 state로 접근해야
    //this.state.title로 바인딩하고 onChange 이벤트로 setState해서 state값 변경해야 비로소 정상
    //change가 발생할 일이 없는 hidden type의 경우 onChange를 사용할 필요 없다.
    return(
      <article>
        <h2>Update</h2>
        <form action="create_process" method="post" onSubmit={
          function(e){
            e.preventDefault();
            //this.props.onSubmit(e.target.title.value, e.target.desc.value);
            this.props.onSubmit(this.state.id, this.state.title, this.state.desc);
          }.bind(this)
          }>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input 
              type="text"
              name="title"
              placeholder='title'
              value={this.state.title}
              onChange={this.inputFormHandler}
            >
            </input>
          </p>
          <p>
            <textarea 
              name="desc"
              placeholder='description'
              value={this.state.desc}
              onChange={this.inputFormHandler}
            >
            </textarea>
          </p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;