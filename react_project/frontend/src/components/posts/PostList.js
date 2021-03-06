import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  background-color: orange;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  background-color: red;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, username, title, body, id, tags } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${username}/${id}`}>{title}</Link>
      </h2>
      <SubInfo username={username} publishedDate={new Date(publishedDate)} />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

// showWriteButton props를 현재 로그인 중인 사용자의 정보를 지니고 있는 user 객체로 설정해 주었다.
// 이렇게 하면 user 객체가 유효할 때, 즉 사용자가 로그인 중일 때문 포스트를 작성하는 버튼이 나타난다.
const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
