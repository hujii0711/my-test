import {useRoute} from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useQuery} from 'react-query';
import {selectArticle, updateArticleLookUpCnt} from '../../../api/articles';
import {useUser} from '../../../commons/hooks/useReduxState';
import Color from '../../../commons/style/Color';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';
import ArticleViewItem from './ArticleViewItem';

const ArticleView = () => {
  console.log('ArticleView 렌더링!!!!!!!');
  const refRBSheet = useRef();
  const {id: articleId, createdDt} = useRoute().params;
  const currentUser = useUser();

  // 조회수 증가
  useEffect(() => {
    (async () => {
      await updateArticleLookUpCnt(createdDt);
    })();
  }, [createdDt]);

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleId], () =>
    selectArticle(articleId),
  );

  if (!selectArticleQuery.data) {
    return (
      <ActivityIndicator size="small" style={{flex: 1}} color={Color.blue2} />
    );
  }

  const {
    title,
    contents,
    created_dt,
    user_id,
    user_name,
    comments,
    lookup,
    liked,
    unliked,
  } = selectArticleQuery.data;

  return (
    <>
      <ArticleViewItem
        _id={articleId}
        _title={title}
        _contents={contents}
        _createdDt={created_dt}
        _userName={user_name}
        _lookup={lookup}
        _liked={liked}
        _unliked={unliked}
        //isMyArticle={currentUser?.user_id === user_id}
        _isMyArticle={true}
      />
      <CommentEntry
        _refRBSheet={refRBSheet}
        _commentCnt={comments === null ? 0 : JSON.parse(comments).length}
      />
      <CommentList
        _refRBSheet={refRBSheet}
        _articleId={articleId}
        _articleCreatedDt={created_dt}
        _comments={comments === null ? undefined : comments}
      />
    </>
  );
};
export default ArticleView;
