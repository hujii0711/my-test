import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags &&
        tags.map((elem) => (
          <Link className="tag" to={`/?tag=${elem.key}`} key={elem.key}>
            #{elem.key}
          </Link>
        ))}
    </TagsBlock>
  );
};

export default Tags;
