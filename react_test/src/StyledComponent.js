import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 768
};

// 위에있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어줍니다.
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce(function(acc, label) {
  acc[label] = function(...rest) {
    console.log("...rest====", ...rest);
    css`@media (max-width: ${sizes[label] / 16}em) {
      ${css(...rest)};
    }`;
  }
  return acc;
}, {});


const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  /*Tagged 템플릿 리터럴을 사용하면 이렇게 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있습니다. 
  styled-components는 이러한 속성을 사용하여 styled-components로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해줍니다.*/
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`};
`
console.log("Box!!!");
;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }`
  console.log("Button!!!");
;

const StyledDiv = styled.div`
  background-color: black;
  width: 100px;
  height: 100px;
`;

const ChildStyleDiv = styled(StyledDiv)`
  border : 2px solid red;
  border-radius : 10px;
  /* props를 활용하여 조건식 활용법 */
  /* background-color: ${({backColor}) => backColor || 'blue'}; */ /* props로 받은 값에 조건이 false이면 blue 사용 */
  /* background-color: ${({backColor}) => backColor && 'red'}; */ /* props로 받은 값에 조건이 true이면 red 사용 */

  ${({backColor}) => backColor && css`
    background-color: gray;
  `};

  &:after {
    width:40px;
    height:40px;
    background-color: blue;
    border: 1px solid red;
    content: "";
    position: absolute;
    left:120px;
  }
  &:hover {
    background: orange;
  }
`;

const WapperDiv = styled.div`
`;

const StyledComponent = () => (
  <WapperDiv>
    <Box color="red">
      <Button>안녕하세요</Button>
      <Button inverted={true}>테두리만</Button>
    </Box>
    <StyledDiv/>
    <ChildStyleDiv backColor='green'/>
  </WapperDiv>
);

export default StyledComponent;
