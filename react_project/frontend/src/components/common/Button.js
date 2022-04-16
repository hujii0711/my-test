import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

// StyledLink라는 컴포넌트를 새로 만들었다.
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

// StyleButton과 똑같은 스타일을 사용하므로, 기존에 사용하던 스타일을 buttonStyle이라는 값에 담아서 재사용했다.
// 그리고 Button 컴포넌트 내부에서 props.to 값에 따라 StyleLink를 사용할지, StyleButton을 사용할지 정하도록 설정
const Button = props => {
  console.log("Button >>>>> props=======", props)
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
