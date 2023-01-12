import React, { Component } from 'react'; 
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css'; //App.js안의 컴포넌트에 적용될 css

// class App는 유사 자바스크립트이다.
class App extends Component{ //리액트가 가지고있는 Component를 상속

  constructor(props){
    super(props);
    this.max_content_id = 3; //굳이 state로 관리할 필요없는 변수라서 state안에 넣지 않음
    this.state = {
      mode : "read",
      selected_content_id : 2,
      subject: {title: "WEB", desc:"World Wide Web!!"},
      welcome: {title: "WelCome!", desc:"김형준 리액트 start!!"},
      contents :[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }

  getReadContent(){
    for(var i =0; i<this.state.contents.length; i++){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read"){     
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={
        function(_title, _desc){
          this.max_content_id = this.max_content_id+1;
          // immutable: 불변, 원본을 바꾸지 않음, 원본을 복제한 다음 복제한 값을 리턴(immutable.js 참조)
          //push: original 데이터를 바꿈
          //concat: original 데이터를 바꾸지 않고 새로운 복제본을 리턴 --> 성능을 위해 concat 사용해야(shouldComponentUpdate사용시 문제 발생)
          //shouldComponentUpdate 사용하지 않을때는 push를 사용해도 상관없다.
          // var arr =[1,2];
          // var arr2 = arr.concat(3); arr:[1,2]
          // arr2는 원본을 변경한 새로운 배열

          // 기존에 있던 데이터에 값을 추가하는 방법
          // this.state.contents.push(
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // );
          //this.setState({
          //  contents : this.state.contents //원본을 변형(★)
          //});

          // push를 사용할때 대안
          // var newContents = Array.from(this.state.contents);
          // newContents.push({id:this.max_content_id, title:_title, desc:_desc})
          // this.setState({
          //   contents : newContents //원본을 교체(☆)
          // });

          // 기존에 setState로 가지고있는 값이 새롭게 만들어진 데이터로 교체하는 방법
          // 신규로 만들때 원본을 수정하지 말고 원본의 복제본을 수정해서 그 리턴값을 setState에 주라
          var _contents = this.state.contents.concat(
            {id:this.max_content_id, title:_title, desc:_desc}
          );
          this.setState({
            contents : _contents, //원본을 교체(☆)
            mode : "read",
            selected_content_id : this.max_content_id
          });
        }.bind(this)}
      ></CreateContent>
    } else if(this.state.mode === "update"){
      _content = this.getReadContent();

      _article = <UpdateContent 
                    data = {_content}
                    onSubmit={
                      function(_id, _title, _desc){
                        var _contents = Array.from(this.state.contents);
                        for(var i =0; i <_contents.length; i++){
                          if(_contents[i].id === _id){
                            _contents[i] = {id:_id, title:_title, desc:_desc};
                            break;
                          }
                        }
                        this.setState({
                          contents : _contents, //원본을 교체(☆)
                          mode : 'read'
                        });
                      }.bind(this)}
                  ></UpdateContent>
    }
    return _article;
  }
  render(){ //Component에는 render 메소드가 있다.
    console.log("APP___render__this======", this);

    // this는 render안에서 this는 컴포넌트 자신을 가리킨다.
    // bind(this)를 제외하면 this는 undefined이다. 왜그러는지는 이고잉도 모름
    return (
      //JSX: create-react-app이 convert
      // onChangePage: Subject 컴포넌트 안에서 링크를 클릭했을때 onChangePage를 실행
      <div className="App">
        <Subject
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangePage = {function(){
            this.setState({
              mode : "welcome", //원본을 교체(☆)
              selected_content_id : 0
            })
          }.bind(this)}>
        </Subject>

        {/* <header>
          <h1><a href="/" onClick={function(e){
            alert("hi");
            e.preventDefault(); // alert()이후 태그의 기본동작 막음
            //this.state.mode ="welcome"; //이런식으로 state값을 변경하면 리액트는 state가 바뀌었는지 인지 하지 못함
            //this.state.mode ="welcome"; this에 아무값이 없어서 오류남 --> bind(this), this.setState도 할 수 없음
            //cf.) 웃긴게 브라우저가 리로딩되면 먹히긴한다.()
            //constructor(props)가 만들어진뒤에는 setState로 state 변경해야함(state가 바뀔때 리액트 내부적으로 처리할은 setState를 통해서 함)
            this.setState({
              mode:"welcome"
            })
            //bind(this): onclick 함수안에서 this는 그 객체가된게함
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.desc}
        </header> */}
        <TOC 
          data={this.state.contents}
          onChangePage = {function(id){
            this.setState({
              mode : "read",
              selected_content_id : Number(id)
            })
          }.bind(this)}>
        </TOC>
        <Control onChangeMode = {function(_mode){
          if(_mode === "delete"){
            if(window.confirm("삭제 할꺼임?")){
              var _contents = Array.from(this.state.contents);
              for(var i = 0; i < this.state.contents.length; i++){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
              }
              this.setState({
                mode : "welcome",
                contents : _contents
              });
              alert("deleted!");
            }
          } else {
            this.setState({
              mode : _mode
            })
          }
           
        }.bind(this)}> 
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

// bind(this) 이해
var obj = {name:"egoing"};

function bindTest(){
  console.log(this.name);
}

//bind라는 함수로 인해서 bindTest함수의 블럭안에서 this는 obj가 되는 새로운 함수가 복제되서 만들어짐
var bindTest2 = bindTest.bind(obj); //bindTest()안에서 this는 obj가 됨
bindTest2(); //egoing


// function App() {
//   return (
    
//   );
// }

export default App;
