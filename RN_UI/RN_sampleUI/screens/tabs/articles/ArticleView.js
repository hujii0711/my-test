import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CommentWrite from './CommentWrite';
import CommentList from './CommentList';
import Color from '../../../commons/Color';

const DATA = {
  id: '1',
  title: 'title1',
  contents:
    'content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1',
  published_at: '2020-01-01',
  user_name: '김형준',
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

const ArticleViewItems = ({title, contents, publishedAt, username}) => {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.small_text}>
        {username} | {publishedAt} | 조회수: 12
      </Text>
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>
    </View>
  );
};

const ArticleView = () => {
  const {id, title, contents, published_at, user_name} = DATA;
  const refRBSheet = useRef();

  return (
    <>
      <ArticleViewItems
        title={title}
        contents={contents}
        publishedAt={published_at}
        username={user_name}
        id={id}
      />
      <CommentWrite refRBSheet={refRBSheet} />
      <CommentList refRBSheet={refRBSheet} />
    </>
  );
};

export default ArticleView;
