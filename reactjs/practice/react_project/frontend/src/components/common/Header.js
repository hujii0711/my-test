import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: #1F85DE;
  border : 2px solid #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  &:hover {
    background-color: #fed136;
  }
  /*&:after {
    display : inline-block;
    content : 'HeaderBlock';
  }*/
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 * Responsive 컴포넌트 속성 그대로 승계 받고 추가적인 Wrapper 컴포넌트의 속성 추가
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  background-color: #2fbe76;
  border-radius: 10px;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: #fff;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 * em 단위는 상위 요소 크기의 몇 배인지로 크기를 정합니다
 * rem 단위는 문서의 최상위 요소, 즉 html 요소의 크기의 몇 배인지로 크기를 정합니다.
 */
const Spacer = styled.div`
  height: 4rem; 
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">{/* Wrapper 컴포넌트에서 만든 class 사용 가능 */}
            Hello React
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
