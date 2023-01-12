import { Component } from 'react';
import './App.css';


class Nav extends Component{

  //state ={
  //   list: []
  //}

  //컴포넌트가 탑재(mount)되서 살아나는 시점에 호출되도록 약속
  //컴포넌트가 초기화될때 네트워크 통신하는데 최적화의 메소드
  //컴포넌트가 생성될때 Ajax 통신을 그 컴포넌트를 초기화 하는 경우 예제
  //componentDidMount()를 이용해서 Ajax 통신을 이용해서 직접 render()에영향을 주는 것이 아니라 그것을 state에 주고
  //state를 변경했기 때문에 render()를 호출하여 처리함
  // componentDidMount(){
    
  //   fetch("list.json")
  //     .then(function(result){
  //       console.log("result----", result); //list.json파일자체는 텍스트이나 result.json() 이것으로 json type의 파일을 제공
  //       return result.json();
  //     })
  //     .then(function(json){
  //       console.log("json----", json);
  //       this.setState({
  //         list : json
  //       })
  //     }.bind(this));
  // }

  // Nav 컴포넌트는 다른 페이지에서도 많이 사용될것으로 생각됨
  // 리액트를 쓰는 이유중 하나가 재사용 가능한 컴포넌트를 만드는 것이다.
  // Nav가 특정한 데이터에 종속되지 않도록 분리해야 한다.(deCouple)
  // 데이터와 상관없이 표현하는데만 치중하는 컴포넌트: presentation component --> 데이터에 종속되지 않고 순수하게 보여주는 것만 담당
  // 데이터를 처리하고 사용자와의 상호작용을 처리하는 애플리케이션에 완전히 종속되어 있는 컴포넌트 : container component
  // Nav 컴포넌트는 container component, presentation component 기능중 presentation component 기능만 사용하도록 하는 방법으로
  // 이미 container component 기능을 사용하고 있는 App 컴포넌트에 분산시켜야

  render(){
    var listTag = [];
    for(var i = 0; i < this.props.list.length; i++){
      var li = this.props.list[i];
      listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function(e){
            e.preventDefault();
            this.props.onClick(e.target.dataset.id);
          }.bind(this)}>{li.title}
          </a>
      </li>)
    }
    return(
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    )
  }
}

class Article extends Component{

  render(){

    return(
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    )
  }
}

class NowLoading extends Component{

  render(){

    return(
      <div>
        <h1>Now Loading....</h1>
      </div>
    )
  }
}

class App extends Component {

  state ={
    article : {
      item:{title : "Welcome", desc :"Hello, React & Ajax"},
      isLoading: false
    },
    list : {
      items: [],
      isLoading : false
    }
  }
  //<Nav>에 있는 기능 <App>으로 옮김: <Nav>를 presentation component 기능만 하게끔
  componentDidMount(){
    var newList = Object.assign({}, this.state.list, {isLoading: true});
    this.setState({list:newList});

    fetch("list.json")
      .then(function(result){
        //console.log("result----", result); //list.json파일자체는 텍스트이나 result.json() 이것으로 json type의 파일을 제공
        return result.json();
      })
      .then(function(json){
        this.setState({
          list : {
            items : json,
            isLoading : false
          }
        })
      }.bind(this));
  }

  render(){
    var NavTag = null;
    if(this.state.list.isLoading){
      NavTag =<NowLoading></NowLoading>;
    } else {
      NavTag = <Nav list={this.state.list.items} onClick={function(id){
        var newArticle = Object.assign({}, this.state.article, {isLoading: true});
        this.setState({article:newArticle});
        
        fetch(id+".json")
          .then(function(result){
            return result.json();
          })
          .then(function(json){
            this.setState({
              article :{
                item:{
                  title : json.title,
                  desc : json.desc
                },
                isLoading : false
              }
            })
          }.bind(this))
      }.bind(this)}></Nav>;
    }

    var ArticleTag = null;
    if(this.state.article.isLoading){
      ArticleTag = <NowLoading></NowLoading>;
    } else {
      ArticleTag = <Article title={this.state.article.item.title} desc={this.state.article.item.desc}></Article>;
    }

    return (
      <div className="App">
        <h1>WEB</h1>
        {NavTag}
        {ArticleTag}
      </div>
    )
  }
}

export default App;
