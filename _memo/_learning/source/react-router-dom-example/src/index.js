import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, NavLink, useParams} from 'react-router-dom';

function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home...
    </div>
  )
}

var contents = [
  {id: 1, title:'HTML', description:'HTML is ...'},
  {id: 2, title:'JS', description:'JS is ...'},
  {id: 3, title:'React', description:'React is ...'}
];

function Topic(){
  //<Route path="/topics/:topic_id">
  //  <Topic></Topic>
  //</Route> 에서 Topic 실행할때 전달받은 파라미터 :topic_id의 값으로 동적으로 render
  var params = useParams();
  console.log(params);
  var topic_id = params.topic_id;

  return(
    <div>
      <h3>Topic</h3>
      <div>
        <h3></h3>
      </div>
    </div>
  )
}

function Topics(){
  var lis = [];
  for(var i = 0; i <contents.length; i++){
    lis.push(<li><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>)
  }

  return(
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Routes>
        <Route path="/topics/:topic_id">
          <Topic></Topic>
        </Route>
      </Routes>
    </div>
  )
}

function Contact(){
  return(
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  )
}

function App(){
  //exact를 쓰지않아도 똑같은 효과 --> switch
  //Link: 리로드 없이 페이지 변환
  //NavLink: 사용자가 현재 자신이 어떤 페이지에 위치하고 있는지 알수 있음(DOM에 class="active")
  return(
    <div>
      <h1>Hello React Router DOM Example</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/topics" element={<Topics/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
