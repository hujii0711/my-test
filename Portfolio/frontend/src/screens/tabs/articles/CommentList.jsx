import React from 'react';
import {IconButton, TextInput} from 'react-native-paper';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useMutation, useQueryClient} from 'react-query';
import CommentItem from './CommentItem';
import Color from '../../../commons/style/Color';
import {writeComment} from '../../../api/comments';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item1',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item2',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item3',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
];

const CommentList = ({CommentListData, refRBSheet, onRemove, onModify}) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const {mutate} = useMutation(writeComment, {
    onSuccess: comment => {
      queryClient.setQueryData(['comments', articleId], comments =>
        (comments || []).concat(comment),
      );
    },
  });
  const onSubmit = message => {
    mutate({
      articleId,
      message,
    });
  };
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
          data={CommentListData}
          renderItem={({item}) => (
            <CommentItem
              id={item.id}
              message={item.message}
              publishedAt={item.created_at}
              username={item.user_id}
              onRemove={onRemove}
              onModify={onModify}
              //isMyComment={item.user_id === currentUser?.user_id}
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={
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
              onChangeText={setMessage}
              onSubmitEditing={() => {
                onSubmit(message);
                setMessage('');
              }}
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
