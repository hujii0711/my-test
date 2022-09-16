import React, {useMemo} from 'react';
import {IconButton, TextInput, ActivityIndicator} from 'react-native-paper';
import {View, FlatList, Text, StyleSheet, RefreshControl} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useMutation, useQueryClient} from 'react-query';

import CommentItem from './CommentItem';
import Color from '../../../commons/style/Color';
import {writeComment, selectListComment} from '../../../api/comments';

const CommentList = ({refRBSheet, articleRef}) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListComment',
    ({pageParam}) => selectListComment({...pageParam}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 10) {
          return {
            cursor: lastPage[lastPage.length - 1].id,
          };
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }

        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const {mutate: mutateWriteComment} = useMutation(writeComment, {
    onSuccess: comment => {
      queryClient.setQueryData <
        InfiniteData >
        ('selectListComment',
        data => {
          if (!data) {
            return {
              pageParams: [undefined],
              pages: [[comment]],
            };
          }
          const [firstPage, ...rest] = data.pages;
          return {
            ...data,
            pages: [[comment, ...firstPage], ...rest],
          };
        });
    },
  });

  const onSubmitWriteComment = message => {
    mutateWriteComment({
      articleRef,
      message,
    });
  };

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return [].concat(...data.pages);
  }, [data]);

  if (!items) {
    return <ActivityIndicator size="large" style={{flex: 1}} color="red" />;
  }

  return (
    <RBSheet
      ref={refRBSheet}
      height={300}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          backgroundColor: Color.pink1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        draggableIcon: {
          backgroundColor: Color.background,
        },
      }}>
      <View style={{backgroundColor: Color.background}}>
        <Text
          style={{
            padding: 15,
            backgroundColor: '#E9E9E9',
            color: Color.text,
          }}>
          댓글 목록
        </Text>
        <IconButton
          icon="close"
          iconColor={Color.background}
          style={styles.button}
          size={26}
          onPress={() => refRBSheet.current.close()}
        />
        <FlatList
          data={data}
          renderItem={({item}) => (
            <CommentItem
              commentId={item.id}
              message={item.message}
              created_at={item.created_at}
              username={item.user_id}
              articleRef={articleRef}
              //isMyComment={item.user_id === currentUser?.user_id}
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{flexDirection: 'row'}}>
              <TextInput
                mode="outlined"
                placeholder="댓글을 입력하세요!"
                selectionColor={Color.divider}
                activeOutlineColor={Color.pink1}
                outlineColor={Color.divider}
                style={{
                  backgroundColor: Color.white,
                  fontSize: 12,
                  margin: 10,
                }}
                value={message}
                onChangeText={text => setMessage(text)}
              />
              <IconButton
                icon="send"
                size={20}
                onPress={() => onSubmitWriteComment(message)}
              />
            </View>
          }
          ListFooterComponent={items => (
            <>
              {items.length > 0 ? <View style={styles.separator} /> : null}
              {isFetchingNextPage && (
                <ActivityIndicator
                  size="small"
                  color="blue"
                  style={{flex: 1}}
                />
              )}
            </>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
          refreshControl={
            <RefreshControl
              onRefresh={fetchPreviousPage}
              refreshing={isFetchingPreviousPage}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 5,
  },
});
export default CommentList;
