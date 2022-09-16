import {useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import Color from '../../../commons/style/Color';

import {selectArticle} from '../../../api/articles';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';

const ArticleViewItems = ({
  title,
  contents,
  created_at,
  user_name,
  isMyArticle,
}) => {
  const isMe = isMyArticle;
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.small_text}>
        {user_name} | {created_at} | 조회수: 12
      </Text>
      {isMe ?? <Text>나의 게시글</Text>}
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>
    </View>
  );
};

const ArticleView = () => {
  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;

  // 전역 상태
  const {users: currentUser} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleRef], () =>
    selectArticle(articleRef),
  );

  return (
    <>
      <ArticleViewItems
        title={selectArticleQuery.data.title}
        contents={selectArticleQuery.data.contents}
        created_at={selectArticleQuery.data.created_at}
        user_name={selectArticleQuery.data.user_name}
        isMyArticle={currentUser?.user_id === user_id}
      />
      <CommentEntry refRBSheet={refRBSheet} lookup={0} />
      <CommentList refRBSheet={refRBSheet} articleRef={articleRef} />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: Color.divider,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
  },
  small_text: {
    fontSize: 12,
    marginTop: 10,
    padding: 10,
  },
  content: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Color.divider,
  },
});

export default ArticleView;
