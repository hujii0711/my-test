import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"

class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3; 
    this.state = {
      mode:'read',
      selected_content_id: 2,
      subject:{title:'react.js project init!!', sub:'닝기미 리액트!!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent() {

    return this.state.contents.filter(elem => elem.id === this.state.selected_content_id)[0];// 정상
    //return this.state.contents.filter(elem => {return elem.id === this.state.selected_content_id});// 정상

    // for(var i = 0; this.state.contents.length; i++){
    //   var data = this.state.contents[i];
    //   if(data.id === this.state.selected_content_id) {
    //      return data;
    //   }
    // } // 정상

    // var data = this.state.contents.filter(function(elem){
    //      return elem.id === this.state.selected_content_id;
    // });
    // console.log("data====", data)
    // return data[0]; // 에러

    //  var data = this.state.contents.filter(elem => 
    //    {return elem.id === this.state.selected_content_id}
    //  );
    //  console.log("data========", data)
    //  return data[0]; // 정상

    // var find = function(){
    //   return this.state.contents.filter(elem => elem.id === this.state.selected_content_id);
    // }
    // return find; // 정상

  }
  getContent() {
    var _title, _desc, _article = null;
    // home 이동
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    // 조회 모드
    } else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    // 글쓰기 모드
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onParentSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id+1;
        // 배열의 불변성 유지
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    // 수정 모드
    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {
          // 배열의 불변성 유지
          var _contents = Array.from(this.state.contents);
          _contents.forEach((elem, idx) => {
            if(elem.id === _id){
              _contents[idx] = {id:_id, title:_title, desc:_desc};
              return false;
            }
          });
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    // this는 render안에서 this는 컴포넌트 자신을 가리킨다.
    // bind(this)를 제외하면 this는 undefined이다. 
    console.log('App render');
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({mode:'welcome'});
          }.bind(this)}
        ></Subject>
        <TOC 
          onChangePage={function(id) {
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}          
          data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(_mode) {
          if(_mode === 'delete') {
            if(window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              _contents.forEach((elem, idx) => {
                if(elem.id === this.state.selected_content_id){
                  _contents.splice(idx, 1);
                  return false;
                }
              });
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;