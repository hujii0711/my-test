import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useQuery} from 'react-query';
import Color from '../../../commons/style/Color';
import {formatDaysAgo} from '../../../commons/utils/common';
import {selectArticle} from '../../../api/articles';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';
import {useUser} from '../../../commons/hooks/useReduxState';

const ArticleViewItems = ({
  id,
  title,
  contents,
  created_at,
  user_name,
  isMyArticle,
}) => {
  const createdAt = formatDaysAgo(created_at);
  const navigation = useNavigation();

  const onPressMove = () => {
    navigation.navigate('ArticleWrite', {id});
  };

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.small_text}>
          {user_name} | {createdAt} | 조회수: 12
        </Text>
        {isMyArticle && (
          <IconButton
            icon="application-edit-outline"
            size={18}
            style={{alignSelf: 'flex-end'}}
            onPress={() => onPressMove()}
          />
        )}
      </View>
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>
    </View>
  );
};

const ArticleView = () => {
  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;

  // 전역 상태
  const currentUser = useUser();

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleRef], () =>
    selectArticle(articleRef),
  );

  //selectArticleQuery 반환값이 없으면 로딩바 출력
  if (!selectArticleQuery.data) {
    return <ActivityIndicator color="red" />;
  }

  const {title, contents, created_at, user_id, user_name} =
    selectArticleQuery.data;
  return (
    <>
      <ArticleViewItems
        id={articleRef}
        title={title}
        contents={contents}
        created_at={created_at}
        user_name={user_name}
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
