import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

const articleJson = {
  id: '2',
  title: 'title2',
  contents: 'content2',
  published_at: '2020-01-01',
  user_name: 'kim',
};

const commentJson = [
  {
    id: '1',
    message: 'message1',
    created_at: '2020-01-01',
    user_id: 'hujii0711',
  },
  {
    id: '2',
    message: 'message2',
    created_at: '2020-01-01',
    user_id: 'hujii0711',
  },
  {
    id: '3',
    message: 'message3',
    created_at: '2020-01-01',
    user_id: 'hujii0711',
  },
];

const styles = StyleSheet.create({
  //CommentItem
  block: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#546e7a',
    fontSize: 10,
    marginTop: 4,
  },
  message: {
    marginTop: 4,
  },
  actionButtons: {
    marginTop: 24,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    fontSize: 12,
    color: '#546e7a',
  },
  pressed: {
    opacity: 0.75,
  },

  //ArticleView
  block2: {
    paddingTop: 24,
    paddingBottom: 64,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username2: {
    fontSize: 12,
    marginTop: 16,
    fontWeight: 'bold',
  },
  date2: {
    marginTop: 4,
    fontSize: 12,
    color: '#546e7a',
  },
  separator2: {
    marginTop: 24,
    marginBottom: 24,
    height: 1,
    backgroundColor: '#eeeeee',
  },

  //CommentInput
  block3: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: '#898989',
  },

  //ArticleScreen
  //spinner: {
  //  flex: 1,
  //},
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

function CommentItem({id, message, username, publishedAt}) {
  return (
    <View style={styles.block}>
      <View style={styles.head}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.date}>{publishedAt}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actionButtons}>
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          hitSlop={8}
          onPress={() => {
            console.log('수정');
          }}>
          <Text style={styles.buttonText}>수정</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          hitSlop={8}
          onPress={() => {
            console.log('삭제');
          }}>
          <Text style={styles.buttonText}>삭제</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ArticleView({title, contents, publishedAt, username}) {
  return (
    <View style={styles.block2}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.username2}>{username}</Text>
      <Text style={styles.date2}>{publishedAt}</Text>
      <View style={styles.separator2} />
      <Text>{contents}</Text>
    </View>
  );
}

function CommentInput() {
  return (
    <>
      <Pressable
        style={styles.block3}
        onPress={() => {
          console.log('댓글 입력');
        }}>
        <Text style={styles.text}>댓글을 입력하세요</Text>
      </Pressable>
    </>
  );
}

function ArticleScreen() {
  const {id, title, contents, published_at, user_name} = articleJson;

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        data={commentJson}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.created_at}
            username={item.user_id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              contents={contents}
              publishedAt={published_at}
              username={user_name}
              id={id}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
    </>
  );
}

export default ArticleScreen;
