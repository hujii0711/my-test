import React, { Component } from 'react'; 

class TOC extends Component{
    // 상위컴포넌트의 state, props가 변경되었을때 자식컴포넌트의 render 함수가 호출될지 말지 결정
    // render() 이전에 shouldComponentUpdate()가 실행된다.
    shouldComponentUpdate(newProps, newState){
        console.log("newProps=============", newProps.data); //새로운 props
        console.log("this.props=============",this.props.data); // 바뀌기전 props
        console.log("TOC=========shouldComponentUpdate");
        if(this.props.data === newProps.data){ // push를 사용하면 원본을 바꾸기 때문에 이전값과 새로운값이 같아져 버리는 현상이 발생
            return false;  
        }
        return true; // true시 render함수 호출O, false시 render 함수 호출X
    }

    // 원본을 바꾸지 않는다. --> immutable
    render(){
        console.log("TOC=========render");
        var lists = [];
        var data = this.props.data;
        for(var i = 0; i < data.length; i++){
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/"+data[i].id}
                        data-id ={data[i].id}
                        onClick={function(e){
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}
                    >{data[i].title}
                    </a>
                </li>
            )
        }
        return(
        <nav>
            <ul>
               {lists}
            </ul>
        </nav>
        );
    }
}

export default TOC;

// 상위 컴포넌트 이벤트에 파라미터 전달 방법 두번째
// href={"/content/"+data[i].id}
// onClick={function(id, e){
//     e.preventDefault();
//     this.props.onChangePage(id);
// }.bind(this, data[i].id)}
