import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  //소멸할때 componentWillUnmount() 수행
  return (
    <div className="container">
      <h1>Hello World!!</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function(){
        setClassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}
var funcStyle = "color:blue";
var funcId = 0;
//FuncComp()를 리액트가 호출할때 첫번째인자에 props를 전달받도록함
function FuncComp(props){ //props다른이름도됨
  //함수방식에서 state를 만들기 위해 useState를 호출
  var numberState = useState(props.initNumber); //인자는 state의 초기값
  // useState는 배열을 리턴하는데 첫번째 인자는 상태이고 두번째 인자는 상태를 바꿀수 있는 함수
  console.log("numberState====",numberState);
  var number = numberState[0]; //state값
  //var number = numberState[0]; //
  var setNumber = numberState[1];//state를 바꾸는 함수

  //var dateState = useState((new Date()).toString()); 
  //var _date = dateState[0];
  //var setDate = dateState[1];

  //위의 코드와 동일한 내용
  var [_date, setDate] = useState((new Date()).toString()); 
  console.log("%cfunc ==> render"+(++funcId), funcStyle);
  
  //useEffect(callback) : callback 함수는 render가 끝나면 호출받도록 약속 로그를 보면 componentDidUpdate와 같다
  useEffect(function(){
    console.log("%cfunc ==> useEffect number(componentDidMount&&componentDidUpdate와 같음)"+(++funcId), funcStyle);

    document.title= number + " : " +_date;
    return function(){
      console.log("%cfunc ==> useEffect return(componentWillUnmount 와 같음)"+(++funcId), funcStyle);
    }  
  //}, [number]); //number값이 바뀌었을때만 useEffect(callback) callback 함수가 수행됨
  });
  // useEffect 복수개 선언 가능
  useEffect(function(){
    console.log("%cfunc ==> useEffect date(componentDidMount&&componentDidUpdate와 같음)"+(++funcId), funcStyle);

    document.title= number + " : " +_date;
  //}, [_date]);
  }); 
  // useEffect(function(){
  //   console.log("%cfunc ==> useEffect number(componentDidMount&&componentDidUpdate와 같음)"+(++funcId), funcStyle);

  //   document.title= number + " : " +_date;
  //   return function(){
  //     console.log("%cfunc ==> useEffect return(componentWillUnmount 와 같음)"+(++funcId), funcStyle);
  //   }
  // }, []); //componentDidMount(), componentDidUpdate 중 componentDidMount()만 수행하고 싶은 경우 빈배열
  // 초기에만 componentDidUpdate() 실행되고 이후 실행 안됨
  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number:{props.initNumber}</p>
      <p>Number:{number}</p>
      <p>Date:{_date}</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }>
      </input>
      <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }
        }>
      </input>
    </div>
  )
}

var classStyle = "color:red";
class ClassComp extends React.Component{
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }

  componentWillMount(){
    console.log("%cclass ==> componentWillMount", classStyle)
  }

  componentDidMount(){
    console.log("%cclass ==> componentDidMount", classStyle)
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("%cclass ==> shouldComponentUpdate", classStyle)
    return true;
  }

  componentWillUpdate(){
    console.log("%cclass ==> componentWillUpdate", classStyle)
  }

  componentDidUpdate(prevProps, prevState){
    //if(prevState.count !== this.state.count){
      //prevState.count 이전값과
      //this.state.count 변경된 값이 
      //다를때만 후속처리를 하면 성능개선에 도움이됨
    //}
    console.log("%cclass ==> componentDidUpdate", classStyle)
  }

  componentWillUnmount(){
    console.log("%cclass ==> componentWillUnmount", classStyle)
  }

  render(){
    console.log("%cclass ==> render", classStyle)
    return(
      <div className="container">
        <h2>class style component</h2>
        <p>Number:{this.props.initNumber}</p>
        <p>Number:{this.state.number}</p>
        <p>Date:{this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({
              number: Math.random()
            })
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({
              date: (new Date()).toString()
            })
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;
